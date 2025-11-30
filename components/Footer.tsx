import React from 'react';
import { Wind } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 pr-8">
            <div className="flex items-center gap-2 mb-6">
               <div className="bg-stone-900 p-2 rounded-lg">
                 <Wind className="w-4 h-4 text-white" />
               </div>
               <span className="font-serif text-xl font-bold text-stone-900">MindfulMove</span>
            </div>
            <p className="text-stone-500 leading-relaxed font-light max-w-sm">
              We believe movement is a conversation with yourself. Our platform helps you find the classes that speak the language your body needs to hear today.
            </p>
          </div>
          
          <div>
            <h5 className="font-serif text-stone-900 font-semibold mb-6">Explore</h5>
            <ul className="space-y-4 text-sm text-stone-500 font-medium">
              <li><a href="#" className="hover:text-sage-700 transition-colors">All Classes</a></li>
              <li><a href="#" className="hover:text-sage-700 transition-colors">Instructors</a></li>
              <li><a href="#" className="hover:text-sage-700 transition-colors">Studios</a></li>
              <li><a href="#" className="hover:text-sage-700 transition-colors">Virtual Retreats</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-serif text-stone-900 font-semibold mb-6">Company</h5>
            <ul className="space-y-4 text-sm text-stone-500 font-medium">
              <li><a href="#" className="hover:text-sage-700 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-sage-700 transition-colors">Philosophy</a></li>
              <li><a href="#" className="hover:text-sage-700 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-sage-700 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-stone-200 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} MindfulMove Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-stone-600">Privacy Policy</a>
            <a href="#" className="hover:text-stone-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};