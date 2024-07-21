import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCard() {
    const [amount, setAmount] = useState(350);
    const [donationInfo, setDonationInfo] = useState({
        totalAmount: 0,
        goalAmount: 0,
        currentAmount: 0,
        donors: [],
        numberOfDonors: 0
    });

    useEffect(() => {
        // Fetch donation information from your backend
        const fetchDonationInfo = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/donations/'); // Direct path
                if (!res.ok) throw new Error('Network response was not ok.');
                const data = await res.json();
                if (data.length > 0) {
                    // Assuming you are interested in the first donation
                    const donation = data[0];
                    setDonationInfo({
                        totalAmount: donation.total_amount_gathered,
                        goalAmount: donation.goal_amount,
                        currentAmount: donation.current_amount,
                        donors: donation.current_donators,
                        numberOfDonors: donation.current_donators.length
                    });
                    console.log('Updated Donation Info:', {
                        totalAmount: donation.total_amount_gathered,
                        goalAmount: donation.goal_amount,
                        currentAmount: donation.current_amount,
                        donors: donation.current_donators,
                        numberOfDonors: donation.current_donators.length
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchDonationInfo();
    }, []);

    const handlePayment = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/payment/order', { // Direct path
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ amount })
            });
            console.log(res);
            if (!res.ok) throw new Error('Network response was not ok.');
            const data = await res.json();
            handlePaymentVerify(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Devknus",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const res = await fetch('http://localhost:4000/api/payment/verify', { // Direct path
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            donor_name: "Donor Name",  // Update this with actual donor name
                            donation_id: donationInfo._id,  // Pass the actual donation ID
                            amount: amount // Pass the donation amount
                        })
                    });

                    if (!res.ok) throw new Error('Network response was not ok.');
                    const verifyData = await res.json();
                    if (verifyData.message) {
                        toast.success(verifyData.message);
                        // Refresh donation info
                        const updatedRes = await fetch('http://localhost:4000/api/donations/'); // Direct path
                        if (!updatedRes.ok) throw new Error('Network response was not ok.');
                        const updatedData = await updatedRes.json();
                        if (updatedData.length > 0) {
                            const donation = updatedData[0];
                            setDonationInfo({
                                totalAmount: donation.total_amount_gathered,
                                goalAmount: donation.goal_amount,
                                currentAmount: donation.current_amount,
                                donors: donation.current_donators,
                                numberOfDonors: donation.current_donators.length
                            });
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        <Card className="mt-6 w-96 bg-[#222f3e] text-white">
            {/* CardHeader */}
            <CardHeader color="transparent" className="relative h-96 bg-[#2C3A47]">
                <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA0QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAEHAgj/xABBEAABAwMCAwUCCwYFBQAAAAABAAIDBAUREiEGMUETIlFhcYGRBxQjMkJSobHB0eEVM2Jy0vAkQ4KSsiU0U2Px/8QAGwEAAgMBAQEAAAAAAAAAAAAAAwQBAgUABgf/xAApEQACAgICAQUAAQQDAAAAAAAAAQIDBBESITEFEyIyQVFCYYGhI3Gx/9oADAMBAAIRAxEAPwAzw/FKz95nkmjtexYHEdFRoowzGwViuyYCGrNj5NORuK8RtmDS7HtTBRVbZmtxvlciu1Q+mqXEk7dUY4T4mayURyy7E9U1Fv8ARa2Kfg6g85aULmyZdlM24Ryw5a8EKGN7XyA5zkppMTaIpqGaX5pwspLXPG0iQg78wjsTRgclIQFLm9aOUe9gGotWv6RVWO3PpCSXZHRMrmgqrWMHZuI6BLuCXYbm30UYZWk6cZcpnROPzWFDrEXPq6kO+i/Az6JlaNgiLtFH0wHNTTEfMPvQ2ZhacOGCm5wJQW7xt1NIGCVWa6JiwNpUb9grZZsq8rcjAQAxNSRBwyQvd0udJY6Q1FWdjsxrebj4BTUrNEOp2MYyfJci4ru8l7vkjg8iipnaYwTgYA3PtOSiLohLk9Bi8fCLc4sy0nYws+ixzST71ui+Fi5yUbY30FOZRkumc44I8m8/tSgLLcb25rqGlkMAOO0Iw0+iuVvDVTbqaF5h+bkuPmo5pF3X/Yd+GfhYbUVraa+0bIInnDKqBx0g/wAbTy9crpkkjHxa2uDmOGQQdivlhuIqkslBbqO3h5LqnB/Ec1PafiMzi8Q/unE8mnp7FLs49sr7PPwOVRoFVkYytzDVE4JXZdXVFWMZyilTXdhSPkceQQLb3c9B6qVUtge6wRnIcTzSrco2RB2jYYKsXO8STuOjIGUHqJHyRuLj0KNXjqPbBW5HLpHTMraj3W0bSF+TLlNyUtS75NQU5XqqPyRWdHyaLANyoo6qXS5udSy02GCKTuxjUN1K+QifGVft0+ipGTsVpwS0hC2T2bqRNRxFzcgDwUtpuZldGHHKI1kbZKd2RthArZTNiuAb9Enkh3Pi9omlqa0x/pqhrmDCsGVuOaDMY5sIw7og9xr6mllYQ/LCdxhS5dbB8e9Ib+0B5KKoIMbvRA6C669Id1RQTiRnNV5JkuLRSoWiGoe4dSjbXjA3QoBuvZWWjIXRlo5rZdLx4odWt7UjyUuFrSpk9o5IHyQYah8jdMgR2UdxCaiMumGkcih67LN9ATju5m18MS6HFslQRE0jpnmfcFzeyW4Xa4wW9o+SGJKg+I8D67Jh+FmaV9da6EZ0gGRw9v6faqnC8sNsiMj21fxidvaB9O3YA5Izt4YUTf4MUR1HZ0lsLKenbFExrWNADQBsAhtwYCx2QCPNVbDd6y5Mc6R0c0I2EgYWP/1D8VWu98EMnYRUzpnnmdQaGnzS8ltjMf5OdcS0cUVa5rQGte7byJV2xvcYw1xw8DBUXEXb1NRh0ADnDI7NweAt2V5NdTADaSNwPqFd9w7K+JdDJaGn4yEZvztNrdhUbXHioCs8TP02x2ECn7otb9WJHM7rUukQO9Cog/KjqHHs3b/RK1mZR1LIW14wsVdHE8DtlJKcxlVoDspnnuFZq8mmwRMcTj1U8OWytd5qvUnErc+KKUcLZdBPUrTi+kZ9nkJh5dT6Ch1A3/HAkcnI6KcCJC2MEdcAOpVLu0dR02MEQ+THohVypu2ICKRu7ipTOBk3USXxKxk1ME/F3wNJbnZaZdzC3D3HZE5A0tPol6spw9xI23QGteA/UvIwWurNU7Ocgo5H80IFYIg2FuyPtGwRI+AcvJvC0QvS0rEEE3zVSphmU58UQl3YVShGJV36Q/AgfChb5H3KGtDXGMRiFpaRs/d3L0H2I1wzQRUfD9O6VwDnxhzyTjG2w92ES4ot4uJhixkMY+TA56iNI+wH3oHOaiJtPH2T5qSENMrY+Z3x7uqDampDtD3DQehiggp3mlZhrmlxPilb9k09yhmD2anSZBIeQR7uSM3YOMJdGJodQ7ztJIIHIbZCAQV0VBVNaKlri8AFud/cgy2mHiugK6wSUV0LRK5zXRvOCc47pQ7hKB8txDQ3LImOcSfo5wneRxq2zvZGXyBpaADjp49Aq3DttFHRyamt7R8h1EeRxj0UTs+Jyh3ss0cOmRUuL36bdjzRqJgDifJLfG0uKQDzVcb7ore/ixNEmyjmmGh2T0KjJ2UE57jvQrYZlHYdXksWsrSpokyByst72yowFX6U5lbnqs1eTTfgiktT5t8kIhQ0j4Yw05OCjEDGmMbBSdmPBPrwZ8ntkY/d4VB1G51UH5PPwRVrNl7a0ZzhQ1shPXZCyJ2MKjVRujeD0RtoHNULqA2Mnook+jlHsptGobIfVU+klX6WRuOaguU0YYd+iE+wn6WbNswBG28kr2WrbjGc7pgZO3G5V4lGWSV5J3UbZQTsUNruJLRQ3CG31dbHHVygFkQBcTnly5clL6WyF2E5PmocH4nwpHXSgeWsbWQNe7OljpA1zsc8A7noqjnYnLt9vtVYtS7TJl8V2EGAdvJK87BoA9mULp2Rtnlb9bcZ8F7oa2pqo5hNEyKMSuawg5LgDj7wvFTFrBIJB8Qq2yQemLSKdw+MR6mRO0sPMMJH4pfloGyVTXx04fVOIw47k+1WKh9Y2dzC8lvRXrJE504klOSB1SzltjfhHunoxR0+gkOk5ud4lZBGWwNB8Mn1KvVDNzlRFpKWfkIn0Vy3ASZx0/5Njf4k9OYdJ2wufcdu70bfFxTONHUwGQ/gKbnAKGZwLX+QKx5OFBIe6/8AlK1mZZ2XUsXhYqEkcBRCmPyjPVDYVegOHN9Vmryaj8DVSn5MKyAqdIR2Td1caR4p5eDNflnsjZeW817e4NbnIQqa6RRzaC4Arm9ErsNRoTfpezpnFTQ3OIjZ7UC4krRJEWNOSVSb6LRXYOFwMY5IXVXZ0oc3B8FJIe5goTLs53ql5NoZUUwzaKl0WnJ5pg+PnT+qVbeTpBTLaYDNI6QNDuyGrB8f7C6M5OSiVnCKi5BItL4G/GMOdjJYeQSVXNFfxxSRNAMVBTOqH4+s/Aam+onzE57Ttpd7NkqcIMNS+6XR4y6qqTHG7/1x90Y9uT7Vf1GftYsl+voQ9Pj7uRyf4JPwm1AdVxU+nU2niMhHiTy+5dEprvZ7BR0tsqbjE19PCxm7y4uIAy44zzOT7Vznj+3VMPEMzyDIKo6oiPYMez8l0y02qmpqJkJp48RMjYO70DAPwRPT4RjRFR/gn1Kx8+wnaKmGpEop5mSRl2tjmnOQdz9uVPO57dgCfRVwH08BbDLowWsxgHm4D7kQgaT35XAnGMqmRFQl2M4lrsr2BaqMsOqRpaT4oNXGWtabfThwbJgzSA40Nz9+yZ7mWRwyT1DtETBlz8ZwEDtd3tlezs7aXNdqz2cow8n8VFFXN8l4L5WSq4a/Q9QQ9tA1mSXMbg58FdjosIG+KZrWvBLCZW4I2OBknHuRynuzRtUN/wBTfyR3jx3vQpXmS46kzc9KBGSuRcdO/wAY1vmV2KargnhcIngnHLquKcaP13PA6EqFDU0H9zlB9i8WqGRndf8AylWCon/Md6FHYI65hYt6SsUHHlrGs6LZl07jogk911nDFPBM57c5WZpmnsOR3wQjSSpZeJBCzW7OPRL7Rl4yAr9RFGaXLgtOuncdsyrrlGfFElRxzSlpjy7XjlhLLquavq3T63gchuhFez/qOGDqmKgpg1jSR0S+TDiug+PYmz3F27JAe1fjwyikbS6MOeST5qq8sD29FehIMY8CFX+gs/uUagkEjHRCXkmTHmmCeHVnzCCTMEcxyhSWwyekEaKMgDwTxYacQ28SEd6U6j6dEp2SE1crIWfS5nwHinvaONrGgBrRgDwXJd7O3taFTjaf9l26rrI+XZOOB0fj8VW4ZgZSWCggic14bA0l7DsSdyfeVU+FaqMNkdG3/Pe2M+/P4JP4e4ndRcOVlC7JqWAikAO7tW2kemc+1BzYTyKlr8ZXHjHHsk/5QZYae7X2rvE8r3UtukEEMTY9nO3y7UdjyOw8k0UF6oaud0DWVLHPOc6Wkf8AJCDbBZeD6ekJzMZWumcDzeWuJ9n4Lxw+zE0tRuNDNjnr9/Mj7V6HFxK68R7/AA83k5Ft2fGuP9QwyTiaYxMBLTKNPQ7Hb7kXnkDIwAhdoh73aHOGjAJVmeYFxcTpa3cleeypudnFHr7YQr+MVrRFXV4o6Z8rnYcQWtHPf0SUKuMvLaiASxk/NPNvoVYvVw+OVLg0ns2bDc9OSEyOJcvTYGDGmnjLyzJvkrH2hzslJbpIpJqWuy/HfbM5xcwenT1RB2kSaSQfMHI9VzqKeSCZskMjmPG4c04wme28TQykRXSMNdjHxhgx7wh3486+49r/AGLPHjL6+Rg1ZGnx2yFzHiu3z/tF5G4BIzjmummLMIlgcJmEbaCMlC7lQfGpQ98eC5uSFm2WxXyQxi1yTcJI5C9rmkhwx6qB2dDs+BXRK3h9j85YPclq5cPzRseY+gK6N8ZB5UtHQ1i99lJ4LETkgXFiBQse8gvTHTANYAPBBaFuEZgOGpCQ+kWIgC4q5UD/AAqoQEGRyIVH/aexa8J7gjBv377Eypb/ANUb6pkpjiAeiV7jJ2dxaempMtA8Ppm79EpmfQcxvsVqiUiQZJ5opRy/JM9EEuDtL1uCuwANSXT/AOMZ18w/LOAglwlHaE8gvEtS9ziQVq10Ul4u8FGCdLnZkPgwcyqhNDxwPROjtwrZxh8/zAejP1R+d+luVppZHG1sYDY2jDAOg6BC7jWBrXEu5BVb0FrhsRvhWqe2gpKaN4Ehl1YPLAH6pW+D+jbW8SN7dodHSAyPyNi4HDft39ipcZXo198LW99lODgHqSpeGr3+z7i5tPE2RszQZcDvkA9PHGScBN0LSWxLLfnidO4qeDbImg85cnfwHhlQWmF0dHGwAh8rtWM8x/ZHRV7hWRV9vpBBL2jTIRnVt4eO3tCOWaFrpDK5uI4WhjfAHy3T+Td7WHrfkzPTKeXqHuv+lf7CGBTU7Yxucc+WUvX+4iFppWOOs7vIP6/hj3Ijd7i2khdKT3zs0D70iVc7pXvc85c4+mEn6Rh8pe/Z/g2si3fxRtx891Xkl0r3RsdUzhpccY5ZIyOWconU0lPMwBrCwhoAcOf6p3L9ax8S5VT7/uvwJj+nW3V84gPtDnO+y9B/9lbqKSSmdl7dQ6PHJQAgFaNV9d0edb2hKyqVb4zWmGbXeKu2v1QSHs87xn5rv78U52m/Ulx0xvAZUfUf19D1XNg/kpQ488kEdQUrk4FN62+n/J0LZROk3FrWZ2x5ILI+nkyHY9qqW641UlG4VUwcwd2MvPe80GuHxhmuSCQkDfCxbsVwlrYzC7Z0vs4VtCu3m8SsQ/bkRzQhUpxhFI3dxCaY7hEY3dxCYyieB3yhRaR4NGc9Ag0B+UVqab5Bw8lo1P4IxMpavE++vxXtI+umK0zZhA8Qla8nM4d/EjlpmAiaM74VMpbgM0fYmuMZkLsIW1rmPAOeaYoQyVpBIyqNdThmNt8pbi1WMxfzPI2blNvAVEYaaeve3DpndnH/ACDn7zt7EsxU7pWhrQTqOB5ldIp6dlFSxU0Y7sMYZ7ev2oa8bDRW5EtTJiPIx6Ln/G94bb7bK5z8POzQnKre4xu08wuHcfVtRWXeO3SAsdGSXg7ddioiuUws5e3BsWYXvllmmkJy4gk804cC0nx+C505wHao3xvAyWHfBHtCTKiYRxNjjAA1d44xkdF1r4HoiLLVTSQMfHJKAXjdwwMbjwT0pKC2ZvB2vWxsNopaimg+KOcyRg1GM/WPPbpv4KwXNoaQROOA0Ze48yc7+eSvQ4fpJKltVBLUwyg5Do5OXvB28uSnutB8fpZIJnkam41DmlrH7rjGb+KG66o1JuK7Of3i7OrJ3bnsxsB/f/1C9T5pMNJG4y4DOMrVypJ6GtkpJRiVjsDwcOhHkrFvjEWJDq1fR5td4H1Gy2MzNhh424f4Ow8WV9umE6VgghAGATuQCCFNqAGByVTtPE7+a9dovnl05Wzc5eWexqqVcUkWMgjHvz1VCptrHnVA4McebSdv0VntAG5K8atRydweQR8PLvxpcq5a/wDAeRi1Xx1NAeVj4nFr2kEeSyN4Ac+V2I2DLiOYHh65R2WOOSMNlYD4eXorl0skVLwZcCGkzAsme4nfZw29gJXscT1mORW+UdSPKZmA6HtPaEg3OodOX/NB5M+qOgCNx18bqV3dwSOZKVNel4J5K3U1Y+IyNb9Q49ym3yIwOxdof4ViF5PiViFonbEyA7j0RCM9xDYVfiOW4WfI0UTw57TZSTE6Hg+Cu0FOHtBXqro8tOAeS0KZrjoysmlys5IRLo3U4keK90VS9oaPYrl1pnR6u6eaHQDDh6quRNa0g9Fehls5fK9Xq6ndpyeik4Xga7BKNXOnY2ndt0Q13Au+rATw6Q+vpmkbNfqPs3/AJ2fI12+VzW2VstJdQ6JushryQPqhpJH2JnsvE1uuzQ2lqG9oP8snDgPRAfgZr1sPmIOGQUq8ZcI03EEGXDsaxgPZTsG48j4hM8UgdyIKlJGCHBUTae0Fkk1pnzTfbZXW2pkhuEemWOP52NngbAg9Qu4cIUVHabbFTQNEUz8Bri/97gYwc9dsqzxFw7RX2idT1cetpB0kfOYfEFexNHQwiKaFr2NA7rh1HUFNe4pw0/Il7bqtUl4DULy3AO3orRY1wyeZStQcX2SsfogrI2vP0H90j3o7FVRloLZGkHfOUHi0hpgriXhiK6NZIx7WzxjAJ5Ob1afzSnV22ro3kVEDmNGwIJc3GehTncquRpIZtuqsdzeRpkAIPilcmv3lpvwOYmQ6HvWxN0LC1OL6W11nz4mseeZYMKtNw3G7enqCB4OblZcsOxeOzWh6hVL7dCphz3gAEjOMfWPgrE0LqWXs5XNLgATpOfYjkVhqYJC9ksZIGGZacBD7nw9c5InMp3wF7zu5xP5K8MWUmotHWZtfbi+v4K1qkFbXh2CWx7NHifFNV1br4aubCNjSv29B+iHWG0/EYuzqGnthzPQ+iN3BmqzVw8aaX/gVr1KMZKMFpIxL5SnFyl5ZwqR2y9TPzSv/AJT9yhmcdIUcr/8ADPH8J+5a00YkWdlWlnaDxWIRYhj4VogP+4qv9zf6Vbi4YowP39T/ALm/0rFiUaQ0mwrb7HTxNaBLOdupb+SuSWmA83ye8fksWI0fqCk+wRdeGqKdp1STjJ+iW/kgDOD6BspIqKvn9Zn9K0sUS8ExfYzWOxU1OWhks5/mLfyRO4WqGaBzXSSjboR+SxYpX1Kv7CVebXFYKC4XOjlmfPFA/Q2YtLRkeAA8Vx6QaJmaSQWHukHBHtWLFFaW2dNvoauCOLbxJcYrfUVAqIXkjMoy4Y8D+a69RzvdsSFpYgWpJjlLbRbeMEYWVEEU8ZZMwOaWnIIWLENBWcc47s9JbpzPRh8TjJjAdshXDVXKa9mcEuDm6sYI8x57LFiYTfsT/wCgsUvcgObLxWxmKAydoxuw7TvED15pgc0EAnwBWLFmY7bT2O50YxktI23u7jZWIKiUOA1bLFiN+iReimeTuVba8kZ2WLFcqak72Cea9TRiSlliOQJI3tJHPBaVixWr+yIs+pzub4Pra5jc19x/3x/0Ly74PbaY3A19xwWn6cf9CxYtWRjI6D+xof8Az1Hvb+S2sWKhJ//Z"
                    alt="card-image"
                />
            </CardHeader>

            {/* CardBody */}
            <CardBody>
                <Typography variant="h5" className="mb-2">
                    My First 
                </Typography>
                <Typography>
                    ₹{donationInfo.currentAmount} <span className="line-through">₹{donationInfo.goalAmount}</span>
                </Typography>
                <Typography>
                    Donors: {donationInfo.numberOfDonors}
                </Typography>
                <Typography>
                    Remaining: ₹{donationInfo.goalAmount - donationInfo.currentAmount}
                </Typography>
                <Typography>
                    {donationInfo.donors.map(donor => (
                        <div key={donor.razorpay_payment_id}>
                            {donor.donor_name} - ₹{donor.amount}
                        </div>
                    ))}
                </Typography>
            </CardBody>

            {/* CardFooter */}
            <CardFooter className="pt-0">
                <Button onClick={handlePayment} className="w-full bg-[#1B9CFC]">Donate Now</Button>
                <Toaster />
            </CardFooter>
        </Card>
    );
}
