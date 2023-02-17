import React from "react";
import styles from "./TodoListItem.module.css";
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";


function Footer() {
  /*let today = new Date();
  let thisYear = today.getFullYear();*/
  return (
    <footer className={styles.footer}>
      <a href="https://codethedream.org/" target="_blank" rel="noreferrer">
        Code The Dream
      </a>
      <a href="https://vadimdmitr.github.io/" target="_blank" rel="noreferrer">
      &copy;Vadim Dmitrochenko
      </a>
      <a href="https://github.com/VadimDmitr" target="_blank" rel="noreferrer">
        <FaGithubSquare />
      </a>
      <a href="https://www.linkedin.com/in/vadim-dmitrochenko-14a88b221/" target="_blank" rel="noreferrer">
        <BsLinkedin />
      </a>
      
    </footer>
  );
}
export default Footer;
