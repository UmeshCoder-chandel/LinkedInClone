import React, { useState } from "react";
import Card from "../components/Card";
import EditIcon from "@mui/icons-material/Edit";
import { Advertisement } from "../components/Advertiement";
import PostCard from "../components/PostCard";
import { Modal } from "../components/Modal";
import { ImageModels } from "../components/ImageModels";
import EditModel from "../components/EditModel";

export const Profile = () => {
  const [imageSetModel, setImageModel] = useState(false);
  const [circularImage, setCircularImage] = useState(true);
  const [infoModel, setInfoModel] = useState(false);

  const handleInfoModel = () => {
    setInfoModel((pre) => !pre);
  };

  const handleImage = () => {
    setImageModel((pre) => !pre);
  };

  const handleCover = () => {
    setImageModel(true);
    setCircularImage(false);
  };

  const handleCircular = () => {
    setImageModel(true);
    setCircularImage(true);
  };

  return (
    <div className="px-5 xl:px-40 py-5 mt-5 flex flex-col gap-5 w-full pt-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex justify-between">
        {/* left side MAIN */}
        <div className="w-full md:w-[70%]">
          {/* Profile Header */}
          <div>
            <Card padding={0}>
              <div className="w-full h-fit">
                {/* Cover Image */}
                <div className="h-[220px] w-full relative rounded-t-md overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1200"
                    alt="cover"
                    className="w-full h-[220px] object-cover"
                  />
                  <div
                    className="absolute cursor-pointer top-4 right-4 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full bg-white shadow-md hover:scale-110 transition"
                    onClick={handleCover}
                  >
                    <EditIcon fontSize="small" />
                  </div>

                  {/* Profile Image */}
                  <div
                    onClick={handleCircular}
                    className="absolute top-[150px] left-6 z-10"
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s"
                      alt="profile"
                      className="w-28 h-28 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition"
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="mt-16 relative px-8 py-4">
                  <div
                    className="absolute cursor-pointer top-3 right-3 z-20 w-[35px] flex justify-center items-center h-[35px] rounded-full bg-white shadow-md hover:scale-110 transition"
                    onClick={handleInfoModel}
                  >
                    <EditIcon fontSize="small" />
                  </div>

                  <div className="w-full">
                    <div className="text-2xl font-bold text-gray-800">
                      Umesh Chandel
                    </div>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      Software Developer | JavaScript | NodeJS | Core Java | HTML
                      | C & C++ | CSS | Full Stack Java
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Indore, Madhya Pradesh, India • 500+ connections
                    </div>
                    <a
                      href="https://github.com/UmeshCoder-chandel"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      github.com/UmeshCoder-chandel
                    </a>
                    <div className="text-sm text-blue-800 w-fit cursor-pointer hover:underline mt-1">
                      2 connections
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* About */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">About</div>
                <div
                  className="cursor-pointer hover:scale-110 transition"
                  onClick={handleInfoModel}
                >
                  <EditIcon fontSize="small" />
                </div>
              </div>
              <div className="text-gray-700 text-sm leading-relaxed">
                Passionate software developer with experience in Java,
                JavaScript, NodeJS and MERN stack. Love building scalable web
                apps and continuously learning new technologies.
              </div>
            </Card>
          </div>

          {/* Skills */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Skills</h3>
                <div
                  className="cursor-pointer hover:scale-110 transition"
                  onClick={handleInfoModel}
                >
                  <EditIcon fontSize="small" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Java",
                  "JavaScript",
                  "NodeJS",
                  "React",
                  "HTML",
                  "CSS",
                  "C++",
                  "SQL",
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full text-sm shadow-sm hover:shadow-md transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Activity */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-3">
                <div className="text-lg font-semibold">Activity</div>
              </div>
              <div className="cursor-pointer px-4 py-2 w-fit rounded-full bg-green-700 text-white font-medium shadow hover:bg-green-800 transition">
                Post
              </div>
              <div className="overflow-x-auto mt-3 flex gap-3 overflow-y-hidden w-full">
                <div className="cursor-pointer shrink-0 w-[350px]">
                  <PostCard profile={1} />
                </div>
                <div className="cursor-pointer shrink-0 w-[350px]">
                  <PostCard profile={1} />
                </div>
              </div>
            </Card>
          </div>

          {/* Experience */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Experience</h3>
                <div className="cursor-pointer hover:scale-110 transition">
                  +
                </div>
              </div>
              <div className="mt-4">
                <div className="p-3 border-t border-gray-200 flex justify-between items-start">
                  <div>
                    <div className="text-md font-medium">
                      DSE Engineer | Full Stack Engineer
                    </div>
                    <div className="text-sm text-gray-600">Amazon</div>
                    <div className="text-sm text-gray-500">
                      March 2025, Present
                    </div>
                    <div className="text-sm text-gray-500">Indore, India</div>
                  </div>
                  <div
                    className="cursor-pointer hover:scale-110 transition"
                    onClick={handleInfoModel}
                  >
                    <EditIcon fontSize="small" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Education */}
          <div className="mt-5">
            <Card padding={1}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Education</h3>
                <div
                  className="cursor-pointer hover:scale-110 transition"
                  onClick={handleInfoModel}
                >
                  <EditIcon fontSize="small" />
                </div>
              </div>
              <div className="p-2">
                <h4 className="font-medium">XYZ University</h4>
                <p className="text-sm text-gray-600">
                  B.Tech in Computer Science
                </p>
                <p className="text-xs text-gray-500">2018 - 2022</p>
              </div>
            </Card>
          </div>
        </div>

        {/* right side */}
        <div className="hidden md:flex md:w-[28%]">
          <div className="sticky top-20">
            <Advertisement />
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {imageSetModel && (
        <Modal title={"Upload Image"} closeModel={handleImage}>
          <ImageModels isCircular={circularImage} />
        </Modal>
      )}

      {/* Info Modals */}
      {infoModel && (
        <Modal title="Edit Info" closeModel={handleInfoModel}>
          <EditModel />
        </Modal>
      )}
      {infoModel && (
        <Modal title="About" closeModel={handleInfoModel}>
          <EditModel />
        </Modal>
      )}
      {infoModel && (
        <Modal title="Skills" closeModel={handleInfoModel}>
          <EditModel />
        </Modal>
      )}
      {infoModel && (
        <Modal title="Experience" closeModel={handleInfoModel}>
          <EditModel />
        </Modal>
      )}
      {infoModel && (
        <Modal title="Education" closeModel={handleInfoModel}>
          <EditModel />
        </Modal>
      )}
    </div>
  );
};
