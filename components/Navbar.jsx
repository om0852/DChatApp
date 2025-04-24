"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import Style from "./Navbar.module.css";
import { Modal, Error } from "./index";
import images from "../assets/index";
import { ChatAppContext } from "@/Context/ChatAppContext";
import Link from "next/link";

const Navbar = () => {
  const menuItems = [
    { menu: "All Users", link: "alluser" },
    { menu: "Chat", link: "/" },
    { menu: "Contact", link: "/" },
    { menu: "Settings", link: "/" },
    { menu: "FAQ", link: "/" },
    { menu: "Terms", link: "/" },
  ];

  const [activeItem, setActiveItem] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { account, userName, ConnectWallet, createAccount, error } = useContext(ChatAppContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={Style.navbar}>
      <div className={Style.container}>
        {/* Logo */}
        <div className={Style.logo}>
          <Image 
            src={images.logo} 
            alt="DChat Logo" 
            width={40} 
            height={40} 
            priority={true}
          />
          <span className={Style.logoText}>DChat</span>
        </div>

        {/* Desktop Menu */}
        <div className={Style.desktopMenu}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`${Style.menuItem} ${
                activeItem === index ? Style.active : ""
              }`}
              onClick={() => setActiveItem(index)}
            >
              {item.menu}
            </Link>
          ))}
        </div>

        {/* Wallet Connection */}
        <div className={Style.walletSection}>
          {account === "" ? (
            <button onClick={ConnectWallet} className={Style.connectButton}>
              <Image 
                src={images.create} 
                width={20} 
                height={20} 
                alt="connect" 
                priority={true}
              />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <button 
              onClick={() => setOpenModal(true)} 
              className={Style.accountButton}
            >
              <Image
                src={userName ? images.accountName : images.create2}
                alt="account"
                width={20}
                height={20}
                priority={true}
              />
              <span>{userName || "Create Account"}</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={Style.mobileMenuButton} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <Image 
            src={isMobileMenuOpen ? images.close : images.open} 
            width={24} 
            height={24} 
            alt="menu" 
            priority={true}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={Style.mobileMenu}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`${Style.mobileMenuItem} ${
                activeItem === index ? Style.active : ""
              }`}
              onClick={() => {
                setActiveItem(index);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.menu}
            </Link>
          ))}
        </div>
      )}

      {/* Modal */}
      {openModal && (
        <div className={Style.modelBox}>
          <Modal 
            openModal={openModal} 
            modelBox={setOpenModal}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Connect your wallet to start chatting"
            smallInfo="Create an account to get started"
            image={images.hero}
            functionName={createAccount}
            account={account}
          />
        </div>
      )}
      
      {/* Error Display */}
      {error && <Error message={error} />}
    </nav>
  );
};

export default Navbar;
