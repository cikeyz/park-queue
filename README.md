<div align="center">

# **ParkQueue**

### _An interactive parking garage simulator visualizing the Queue data structure. 🚗_

<!-- Badges are a great way to show project status at a glance! -->
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/cikeyz/park-queue?style=for-the-badge&color=6C5CE7">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/cikeyz/park-queue?style=for-the-badge&color=blue">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/cikeyz/park-queue?style=for-the-badge&color=green">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/cikeyz/park-queue?style=for-the-badge&color=orange">
  <img alt="GitHub license" src="https://img.shields.io/github/license/cikeyz/park-queue?style=for-the-badge&color=informational">
</p>

</div>

---

## 🚀 Overview

Welcome to **ParkQueue**! This project is a dynamic, web-based simulation of a single-lane parking garage, specifically designed to visualize the **Queue** data structure and its "First-In, First-Out" (FIFO) principle.

The main goal was to bring an essential computer science concept to life in an intuitive and interactive way. I built this as a companion to my "ParkStacks" project to clearly demonstrate the fundamental difference between LIFO and FIFO logic. Whether you're a student learning data structures or just someone who enjoys a good visualization, I hope ParkQueue makes the concept of queues click for you!

---

## ✨ Features

Here are some of the cool things this project can do:

* **Interactive Queue Visualization:** Watch cars enter, wait in line, and exit in the exact order they arrived, perfectly illustrating the FIFO principle.
* **Smooth CSS Animations:** See cars smoothly animate into the garage, shift forward as others depart, and exit the queue.
* **Real-time Status Dashboard:** Monitor the garage's capacity with a progress bar, track total arrivals and departures, and view a live list of all currently parked cars.
* **Dynamic Light/Dark Theme:** A sleek theme toggle that adapts to your preference and saves your choice for future visits.
* **Instant User Feedback:** Get clear notices for every operation, including successful parks/departures, a full garage, or if a car isn't found.
* **Responsive Design:** Enjoy a clean, modern interface that works seamlessly on any device.

---

## 🛠️ Installation & Setup

Getting this project up and running is as simple as it gets. No complex builds or dependencies needed!

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/cikeyz/park-queue.git](https://github.com/cikeyz/park-queue.git)
    cd park-queue
    ```

2.  **Open in your browser**
    * Simply open the `index.html` file in any modern web browser.

And that's it! You're ready to start simulating.

---

## 💡 Usage Examples

Using the simulator is straightforward and interactive:

* **To Park a Car:** Enter a license plate number in the input field and click the "Park" button. The car will join the end of the queue.
* **To Depart a Car:** Click the "Depart" button. The car at the very front of the queue (the one that has been there the longest) will exit.
* **To Use a Random Plate:** Click the "Random Plate" button to generate a sample license plate number for quick parking.
* **To Change the Theme:** Use the theme toggle button in the header to switch between light and dark modes.

---

## 💻 Tech Stack / Dependencies

This project was built with a focus on fundamentals and a clean, vanilla implementation.

* **Frontend:** HTML5, CSS3, and modern JavaScript (ES6+)
* **Core Logic:** A `GarageSystem` class that implements the queue data structure using a JavaScript Array to manage all parking logic based on the FIFO principle.
* **UI Management:** A `ParkingGarageUI` class to handle all DOM manipulation, event listeners, and animations.
* **Styling:** Custom CSS variables for dynamic theming and animations.
* **Storage:** Browser LocalStorage for persisting the user's theme preference.

---

## 🙌 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Found a bug? Don't worry, we all create them. Just open an issue and I'll take a look!

---

## 📜 License

This project is distributed under the MIT License. See the `LICENSE` file for more information. It's pretty permissive, so you can do almost anything you want with it.

---

## 📬 Contact

**Carl Kristian (CK) Ortiz**

* GitHub: [@cikeyz](https://github.com/cikeyz)
* LinkedIn: [ck-ortiz](https://www.linkedin.com/in/ck-ortiz)
* Email: [carlkristianrortiz@iskolarngbayan.pup.edu.ph](mailto:carlkristianrortiz@iskolarngbayan.pup.edu.ph)

<br>

<div align="center">
  _Crafted with ☕ and a bit of chaos._
</div>
