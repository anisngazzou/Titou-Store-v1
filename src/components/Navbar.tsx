'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// import { BiUser } from "react-icons/bi";
// import { PiHandbag } from "react-icons/pi";

import Button from '@/components/Button';



import Link from 'next/link';
import { useTranslations } from 'next-intl';
const Navbar: React.FC = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [selectedNavItem, setSelectedNavItem] = useState('home');
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const t = useTranslations("");
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);
 
const enEnum = ['en-US','en']
const frEnum = ['fr-FR','fr']
const handleNavigation = (navItem:string)=>{
  setSelectedNavItem(navItem)
localStorage.setItem('path',navItem)
}
useEffect(() => {
  if (typeof window !== 'undefined') {
    const savedPath = localStorage.getItem('path');
    if (savedPath) {
      setSelectedNavItem(savedPath);
    }
  }
}, []); 
  return (
    <nav className={"bg-primary px-4 pt-4 pb-2 flex flex-col w-full fixed " + ` top-0 w-full  transition-transform duration-300 z-50 ${
        isScrollingUp ? 'transform translate-y-0  ' : 'transform -translate-y-full  '
      }`}>
  
      <div className='flex justify-between mt-2'>
      <div className="flex items-center space-x-8">
      <Image
              
              width={20}
              height={20} className='w-20' src={'/svg/logo.svg'} alt={'titou logo'} />
  
      <Link href="/" passHref>
            <span className={`text-black font-bold hover:text-[#b2ac9c7d] ${selectedNavItem === 'home' ? 'underline underline-offset-2' : ''}`} onClick={() => handleNavigation('home')}>
              {/* {t('navBar.home')} */}
            </span>
          </Link>

          <Link href="/products" passHref>
            <span className={`text-black font-bold hover:text-[#b2ac9c7d] ${selectedNavItem === 'products' ? 'underline underline-offset-2' : ''}`} onClick={() => handleNavigation('products')}>
              {/* {t('navBar.products')} */}
            </span>
          </Link>

          <Link href="/about-us" passHref>
            <span className={`text-black font-bold hover:text-[#b2ac9c7d] ${selectedNavItem === 'aboutUs' ? 'underline underline-offset-2' : ''}`} onClick={() => handleNavigation('aboutUs')}>
              {/* {t('navBar.aboutUs')} */}
            </span>
          </Link>

          <Link href="/contact" passHref>
            <span className={`text-black font-bold hover:text-[#b2ac9c7d] ${selectedNavItem === 'contact' ? 'underline underline-offset-2' : ''}`} onClick={() => handleNavigation('contact')}>
              {/* {t('navBar.contact')} */}
            </span>
          </Link>
      </div>
    
      <div className='flex space-x-2 items-center'>
      <div className="flex items-center space-x-4">
       <Link href={'/sign-in'}>
       <Button className="flex items-center space-x-2">
          {/* <BiUser size={24}/> */}
          {/* <span>{t('navBar.login')}</span> */}
        </Button>
       </Link>

        <div className=" rounded-full bg-white p-2 hover:bg-[#b2ac9c7d]  ">
        {/* <PiHandbag size={24}  /> */}
        </div>
      </div>
          <button
            className={` ${enEnum.includes('fr') ? 'text-black font-bold' : 'text-gray-400 font-normal'}`}
            // onClick={() => handleLanguageChange('en')}
          >
            EN
          </button>
          <p className='font-bold text-black'>|</p>
          <button
            className={` ${frEnum.includes('fr') ? 'text-black font-bold' : 'text-gray-400 font-normal'}`}
            // onClick={() => handleLanguageChange('fr')}
          >
            FR
          </button>
        </div>
      </div>
    
    </nav>
  );
};


export default Navbar;
