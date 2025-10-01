import React from "react";
import { Link } from "react-router-dom"; // <-- add this
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Calendar, Share2, PenTool, Heart, Sparkles, ImageOff } from "lucide-react";
import { motion } from "framer-motion";
import logo from '../../IMG/logo.png'
import Journing_img from "../../IMG/Journing_img.png";
import Sharing_img from "../../IMG/Sharing_img.png";
import Calendar_img from "../../IMG/Calendar_img.png";
import bg from "../../IMG/128.png";
import "./style.css";

export default function LandingPage() {

  useEffect(() => {
    document.title = "Recall";
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Navigation */}
      <nav className="relative z-10 px-6 sm:px-8 md:px-12 py-6 md:py-8">
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 sm:space-x-3"
          >
            <Link to="/login">
            <Button
              className="text-sm sm:text-base px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 
                         bg-[#6C63FF] text-white hover:bg-[#5b53e6] transition-all duration-300 
                         rounded-lg font-medium shadow-md"
            >
              Login
            </Button>
            </Link>
            

            {/* Sign In navigates to /signin */}
            
              <Link to="/signup">
              <Button
                className="text-sm sm:text-base px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 
                           bg-white text-[#6C63FF] hover:bg-gray-100 transition-all duration-300 
                           rounded-lg font-medium shadow-md"
              >
                Sign Up
              </Button>
              </Link>
            
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex items-center justify-center w-full px-6 text-center py-16 sm:py-20">
        <div className="max-w-4xl">
          <h1 className="text-[10vw] sm:text-[7.5vw] font-cookie text-white leading-tight">
            Plan, Reflect, and
          </h1>
          <h1 className="text-[10vw] sm:text-[7.5vw] font-cookie text-white leading-tight">
            Relive.
          </h1>
          <p className="text-[4vw] sm:text-[2vw] font-cookie text-white mt-4">
            Building a more organized, engaging, and creative journaling experience.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 py-8 sm:py-16 lg:px-6 lg:py-20">
        <div className="w-[95%] sm:w-[85%] lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Journaling Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-yellow-100 border-none shadow-xl hover:shadow-2xl 
                              transition-all duration-500 rounded-3xl p-6 
                              h-auto sm:aspect-[4/3] overflow-hidden">
                <CardContent className="flex flex-col h-full">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2 text-[clamp(1rem,1.5vw,2rem)]">
                      Journaling-
                    </h3>
                    <p className="font-brawler font-bold text-gray-900 text-[clamp(1.5rem,3vw,3rem)]">
                      Organize your mind.
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-1 mt-4 overflow-hidden">
                    <img
                      src={Journing_img}
                      alt="Journaling illustration"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sharing Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-rose-200 border-none shadow-xl hover:shadow-2xl 
                              transition-all duration-500 rounded-3xl p-6 
                              h-auto sm:aspect-[4/3] overflow-hidden">
                <CardContent className="flex flex-col h-full">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2 text-[clamp(1rem,1.5vw,2rem)]">
                      Sharing-
                    </h3>
                    <p className="font-brawler font-bold text-gray-900 text-[clamp(1.5rem,3vw,3rem)]">
                      Doing more, together.
                    </p>
                  </div>
                  <div className="flex justify-center items-center flex-1 mt-4 overflow-hidden">
                    <img
                      src={Sharing_img}
                      alt="Sharing illustration"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Calendar Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="sm:col-span-2"
            >
              <Card className="bg-indigo-200 border-none shadow-xl hover:shadow-2xl 
                              transition-all duration-500 rounded-3xl p-6 
                              h-auto sm:aspect-[8/3] overflow-hidden">
                <CardContent className="flex flex-col sm:flex-row h-full items-center justify-between relative">
                  {/* Left Section */}
                  <div className="flex-1 flex flex-col justify-center h-full relative">
                    <h3 className="font-semibold text-gray-700 text-[clamp(1rem,1.5vw,2rem)] 
                                   sm:absolute sm:top-0 sm:left-0 mb-2 sm:mb-0">
                      Calendar-
                    </h3>
                    <p className="font-brawler font-bold text-gray-900 leading-snug text-[clamp(1.5rem,3vw,3rem)]">
                      Meeting your expectations on time
                    </p>
                  </div>

                  {/* Right Section (Image) */}
                  <div className="flex-1 flex justify-center items-center overflow-hidden mt-4 sm:mt-0">
                    <img
                      src={Calendar_img}
                      alt="Calendar illustration"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
