import React, { useState, useEffect } from 'react';
import { LuLeaf } from 'react-icons/lu';
import Modal from 'react-modal';
import Login from '../../Components/Homepage/Login';

// Set the app element for react-modal
Modal.setAppElement('#root');

const HomePage = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);

  const carouselData = [
    {
      imgSrc: "/food-sharing.png",
      title: "About Us", 
      description: "NourishAI is dedicated to reducing food waste by connecting restaurants, NGOs, and volunteers. Our platform coordinates food donations and ensures that surplus food is shared with those in need, promoting sustainability and reducing food wastage. Through our collaborative efforts, we aim to create a more sustainable food ecosystem, where no food goes to waste and every meal makes a difference."
    },
    {
      imgSrc: "/food_4.jpg",
      title: "Our Impact",
      description: "Together we're making a difference in reducing food waste."
    },
    {
      imgSrc: "/photo2.jpg",
      title: "Join The Movement", 
      description: "Be part of the solution by joining our network of food heroes."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prevCard) => (prevCard + 1) % carouselData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <div className="bg-green-100 min-h-screen flex flex-col relative w-full">
      {/* Header Section */}
      <header className="flex justify-between items-center px-3 py-2 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="flex items-center">
          <LuLeaf className="text-green-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mr-2 hover:rotate-[-45deg] transition-transform duration-300" />
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-green-900">NourishAI</h1>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-1 sm:py-2 px-3 sm:px-4 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 active:scale-95 text-xs sm:text-sm md:text-base"
          onClick={toggleLoginPopup}
        >
          Join Us
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-3 sm:px-4 py-6 sm:py-8 md:py-10 lg:py-12 bg-green-100">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-green-800 mb-3 sm:mb-4 animate-fade-in">
          Reducing Food Waste, One Meal at a Time
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-green-600 max-w-3xl mx-auto px-2">
          Collaborating with restaurants, NGOs, and volunteers to ensure no food goes to waste.
        </p>
      </section>

      {/* Flowchart Section */}
      <section className="p-3 sm:p-4 md:p-6 lg:p-8 bg-green-100">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-green-800 mb-4 sm:mb-6">
          How It Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 text-center">
          {/* Restaurants Card */}
          <div className="flex flex-col items-center p-3 sm:p-4">
            <div className="bg-green-400 p-3 sm:p-4 md:p-5 lg:p-6 rounded-full shadow-md mb-3 sm:mb-4 transform transition duration-500 ease-in-out hover:scale-110 animate-bounce">
              <span className="text-2xl sm:text-3xl md:text-4xl text-green-600">🏨</span>
            </div>
            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-green-800">Restaurants</h4>
            <p className="text-xs sm:text-sm md:text-base text-green-600 mt-2">Provide surplus food data</p>
          </div>

          {/* Volunteers Card */}
          <div className="flex flex-col items-center p-3 sm:p-4">
            <div className="bg-green-400 p-3 sm:p-4 md:p-5 lg:p-6 rounded-full shadow-md mb-3 sm:mb-4 transform transition duration-500 ease-in-out hover:scale-110 animate-bounce">
              <span className="text-2xl sm:text-3xl md:text-4xl text-green-600">🤝</span>
            </div>
            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-green-800">Volunteers</h4>
            <p className="text-xs sm:text-sm md:text-base text-green-600 mt-2">Help with food collection</p>
          </div>

          {/* NGOs Card */}
          <div className="flex flex-col items-center p-3 sm:p-4">
            <div className="bg-green-400 p-3 sm:p-4 md:p-5 lg:p-6 rounded-full shadow-md mb-3 sm:mb-4 transform transition duration-500 ease-in-out hover:scale-110 animate-bounce">
              <span className="text-2xl sm:text-3xl md:text-4xl text-green-600">🌟</span>
            </div>
            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-green-800">NGOs</h4>
            <p className="text-xs sm:text-sm md:text-base text-green-600 mt-2">Distribute to those in need</p>
          </div>

          {/* People's Help Card */}
          <div className="flex flex-col items-center p-3 sm:p-4">
            <div className="bg-green-400 p-3 sm:p-4 md:p-5 lg:p-6 rounded-full shadow-md mb-3 sm:mb-4 transform transition duration-500 ease-in-out hover:scale-110 animate-bounce">
              <span className="text-2xl sm:text-3xl md:text-4xl text-green-600">❤</span>
            </div>
            <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-green-800">People's Help</h4>
            <p className="text-xs sm:text-sm md:text-base text-green-600 mt-2">Support through donations</p>
          </div>
        </div>
      </section>

      {/* Image and Carousel Section */}
      <section className="relative p-3 sm:p-4 md:p-6 lg:p-8 bg-green-100 rounded-lg flex flex-col md:flex-row gap-3 sm:gap-4">
        {/* Food Sharing Image */}
        <div className="w-full md:w-7/12 h-[16rem] sm:h-[20rem] md:h-[24rem] lg:h-96">
          <img
            src="/food-sharing2.png"
            alt="Food Sharing"
            className="w-full h-full object-contain rounded-lg shadow-lg transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* Carousel Card */}
        <div className="w-full md:w-5/12 flex justify-center items-center h-[16rem] sm:h-[20rem] md:h-[24rem] lg:h-96">
          {/* First Card - Text Only */}
          {currentCard === 0 && (
            <div className="bg-green-100 shadow-md rounded-lg overflow-hidden w-full h-full p-3 sm:p-4 md:p-5 lg:p-6 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-green-800">
                {carouselData[currentCard].title}
              </h4>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-green-600 mt-2">
                {carouselData[currentCard].description}
              </p>
            </div>
          )}

          {/* Second Card - Image and Text */}
          {currentCard !== 0 && (
            <div className="bg-green-100 shadow-md rounded-lg overflow-hidden w-full h-full transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
              <div className="h-3/4">
                <img
                  src={carouselData[currentCard].imgSrc}
                  alt={carouselData[currentCard].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 sm:p-4 h-1/4">
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-green-800">{carouselData[currentCard].title}</h4>
                <p className="text-xs sm:text-sm md:text-base text-green-600 mt-1 sm:mt-2">{carouselData[currentCard].description}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* New Innovative Sections */}
      
      {/* Statistics Section with Counter Animation */}
      <section className="py-12 bg-gradient-to-r from-green-800 to-green-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <h3 className="text-4xl font-bold mb-2">1000+</h3>
              <p>Meals Saved Daily</p>
            </div>
            <div className="text-center text-white">
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p>Partner Restaurants</p>
            </div>
            <div className="text-center text-white">
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p>NGO Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Parallax Effect */}
      <section className="py-16 bg-green-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300">
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="w-16 h-16 rounded-full mx-auto mb-4"/>
              <p className="text-gray-600 italic mb-4">"NourishAI has made it so easy for our restaurant to contribute to the community."</p>
              <h4 className="font-semibold text-green-800">Atharva Ajagekar</h4>
              <p className="text-sm text-green-600">Restaurant Owner</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300">
              <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="User" className="w-16 h-16 rounded-full mx-auto mb-4"/>
              <p className="text-gray-600 italic mb-4">"The platform has streamlined our food distribution process significantly."</p>
              <h4 className="font-semibold text-green-800">Srushti Jadhav</h4>
              <p className="text-sm text-green-600">NGO Director</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300">
              <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="User" className="w-16 h-16 rounded-full mx-auto mb-4"/>
              <p className="text-gray-600 italic mb-4">"Proud to be part of this movement to reduce food waste."</p>
              <h4 className="font-semibold text-green-800">Tejas Shinde</h4>
              <p className="text-sm text-green-600">Volunteer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section with Floating Elements */}
      <section className="relative py-20 bg-gradient-to-b from-green-800 to-green-900 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8">Join our mission to create a world without food waste</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
              <button onClick={toggleLoginPopup} className="bg-white text-green-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-100 transform hover:scale-105 transition duration-300 shadow-xl">
                Get Started Now
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-green-800 transform hover:scale-105 transition duration-300">
                Learn More
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-12 border-t border-green-700 pt-12">
              <div>
                <h3 className="text-3xl font-bold mb-2">24/7</h3>
                <p className="text-green-200">Support Available</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">100%</h3>
                <p className="text-green-200">Secure Platform</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">10K+</h3>
                <p className="text-green-200">Active Users</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">50+</h3>
                <p className="text-green-200">Cities Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Popup */}
      <Modal
        isOpen={showLoginPopup}
        onRequestClose={toggleLoginPopup}
        contentLabel="Login"
        className="modal bg-white rounded-xl shadow-2xl w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto transform transition-all duration-300 ease-in-out animate-fade-in-up"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        closeTimeoutMS={300}
      >
        <Login closeModal={toggleLoginPopup} />
      </Modal>
    </div>
  );
};

export default HomePage;