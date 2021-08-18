import React, { Component } from "react";
import {
  FaGoogle,
  FaAmazon,
  FaApple,
  FaFacebookF,
  FaMicrosoft,
  FaAdobe,
  FaTwitter,
  FaBtc,
} from "react-icons/fa";

import Title from "./Title";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaGoogle />,
        title: "Tech Gaints Company",
        info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      },
      {
        icon: <FaAmazon />,
        title: "Tech Gaints and E-commerce Company",
        info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      },
      {
        icon: <FaApple />,
        title: "Most creative and innovative company",
        info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      },
      {
        icon: <FaFacebookF />,
        title: "Tech Gaints and social Company",
        info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      },
      {
        icon: <FaMicrosoft />,
        title: "Tech Gaints Company",
        info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      },
      {
        icon: <FaAdobe />,
        title: "Tech and Graphics (GUI) Company",
        info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      },
      {
        icon: <FaTwitter />,
        title: "Social information Company",
        info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      },
      {
        icon: <FaBtc />,
        title: "Tech Financial Company",
        info: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration",
      },
    ],
  };
  render() {
    return (
      <div>
        <section className="services">
          <Title title="services" />
          <div className="services-center">
            {this.state.services.map((items, index) => {
              return (
                <article key={index} className="service">
                  <span>{items.icon}</span>
                  <h5>{items.title}</h5>
                  <p>{items.info}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}
