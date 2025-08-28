// const Footer = () => {
//   return (
//     <footer className="bg-gray-100 py-6 border-t">
//       <div className="container mx-auto px-4">
//         {/* Links */}
//         <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-3">
//           <a href="#" className="hover:underline">
//             About
//           </a>
//           <a href="#" className="hover:underline">
//             Accessibility
//           </a>
//           <a href="#" className="hover:underline">
//             Help Center
//           </a>
//           <a href="#" className="hover:underline">
//             Privacy & Terms
//           </a>
//           <a href="#" className="hover:underline">
//             Advertising
//           </a>
//           <a href="#" className="hover:underline">
//             Business Services
//           </a>
//           <a href="#" className="hover:underline">
//             Get the App
//           </a>
//         </div>

//         {/* Language Selector + CopyRight */}
//         <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-gray-600 text-sm">
//           <select
//             className="border rounded-md px-2 py-1 text-sm focus:outline-none"
//             defaultValue="en"
//           >
//             <option value="en">English</option>
//             <option value="hi">हिंदी</option>
//             <option value="es">Español</option>
//             <option value="fr">Français</option>
//           </select>
//           <p>© 2025 LinkedIn Corporation. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


const Footer = () => {
    return (
        <div className="bg-gray-100 py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm text-gray-600">© 2025 LinkedIn Corporation. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;