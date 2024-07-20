import React from 'react';
import '../styles/detailedProject.css';

const DetailedProject = () => {
  const project = JSON.parse(localStorage.getItem('selectedProject'));

  if (!project) {
    return <div>No project selected</div>;
  }

  return (
    <div className="detailed-project">
      <h1>{project.donation_title}</h1>
      <p>{project.donation_discription}</p>
      <p>Raised: ₹{project.current_amount}</p>
      <p>Target: ₹{project.goal_amount}</p>
      <p>Created by: {project.student_name}</p>
      <p>Created on: {new Date(project.time_of_creation).toLocaleDateString()}</p>
      <p>Deadline: {new Date(project.donation_deadline).toLocaleDateString()}</p>
      <h3>Updates on Donation:</h3>
      <ul>
        {project.updates_on_donation.map((update, index) => (
          <li key={index}>{update}</li>
        ))}
      </ul>
      <h3>Media Images:</h3>
      <ul>
        {project.media_images.map((image, index) => (
          <li key={index}>
            <img src={`path_to_images/${image}`} alt={`Media ${index + 1}`} />
          </li>
        ))}
      </ul>
      <h3>Current Donators:</h3>
      <ul>
        {project.current_donators.map((donator) => (
          <li key={donator._id}>
            {donator.name} - ₹{donator.amount}
          </li>
        ))}
      </ul>
      <h3>Comments:</h3>
      <ul>
        {project.comments.map((comment) => (
          <li key={comment._id}>
            {comment.name}: {comment.messege}
          </li>
        ))}
      </ul>
      <h3>Payment Options:</h3>
      <ul>
        {project.payment_recive_option.map((option) => (
          <li key={option._id}>
            {option.paymnet_recive_name}: {option.payment_recive_details}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailedProject;
