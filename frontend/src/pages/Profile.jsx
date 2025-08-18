import React from "react";
import Card from "../components/Card";

export const Profile = () => {
  return (
    <>
      {/* Top Profile Section */}
      <Card>
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {/* Cover Image */}
          <div className="h-40 bg-gray-200 relative">
            <img
              src="https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1200"
              alt="cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Image */}
          <div className="px-6">
            <div className="relative -mt-16 w-28 h-28">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s"
                alt="profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
              />
            </div>

            {/* Profile Info */}
            <div className="mt-3">
              <h2 className="text-2xl font-bold">Umesh Chandel</h2>
              <p className="text-gray-600">
                Software Developer | JavaScript | NodeJS | Core Java | HTML | C
                & C++ | CSS | Full Stack Java
              </p>
              <p className="text-sm text-gray-500">
                Indore, Madhya Pradesh, India • 500+ connections
              </p>
              <a
                href="https://github.com/UmeshCoder-chandel"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                github.com/UmeshCoder-chandel
              </a>
            </div>
          </div>
        </div>
      </Card>

      {/* About Section */}
      <Card>
        <div className="bg-white rounded-2xl shadow p-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-700">
            Passionate software developer with experience in Java, JavaScript,
            NodeJS and MERN stack. Love building scalable web apps and
            continuously learning new technologies.
          </p>
        </div>
      </Card>

      {/* Experience Section */}
      <Card>
        <div className="bg-white rounded-2xl shadow p-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Experience</h3>
          <ul className="space-y-2">
            <li>
              <p className="font-medium">Software Developer</p>
              <p className="text-sm text-gray-600">InfoBeans Foundation</p>
            </li>
          </ul>
        </div>
      </Card>

      {/* Education Section */}
      <Card>
        <div className="bg-white rounded-2xl shadow p-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          <div>
            <h4 className="font-medium">XYZ University</h4>
            <p className="text-sm text-gray-600">B.Tech in Computer Science</p>
            <p className="text-xs text-gray-500">2018 - 2022</p>
          </div>
        </div>
      </Card>

      {/* Skills Section */}
      <Card>
        <div className="bg-white rounded-2xl shadow p-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
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
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};
