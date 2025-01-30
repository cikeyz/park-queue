# ParkQueue

<p align="center">
  <strong>Simulate FIFO parking flow with queues, plates, and live occupancy.</strong><br>
  Vanilla HTML, CSS, and JavaScript. Queue-backed parking model.
</p>

<p align="center">
  <a href="https://case-study-3-dsa-g3.vercel.app/">Live Demo</a>
  &nbsp;·&nbsp;
  <a href="https://cikeyz.github.io/park-queue/">GitHub Pages</a>
  &nbsp;·&nbsp;
  <a href="#quick-start">Quick Start</a>
  &nbsp;·&nbsp;
  <a href="#project-structure">Structure</a>
  &nbsp;·&nbsp;
  <a href="#license">License</a>
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111111">
  <img alt="License MIT" src="https://img.shields.io/badge/License-MIT-22c55e?logo=open-source-initiative&logoColor=white">
</p>

## Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [License](#license)
- [Course Note](#course-note)

## Overview

ParkQueue is the queue counterpart to stack-based parking. Vehicles enter and
leave following FIFO rules so you can compare queue discipline against LIFO
garage behavior in the sibling ParkStacks project.

## Features

| Feature | Description |
|---------|-------------|
| Queue parking | FIFO park/depart with capacity checks |
| Live board | Spot grid and occupancy counters |
| Plates | Manual entry or random plate helper |
| Logs | Arrival and departure movement stats |
| Theme toggle | Light and dark UI |

## Quick Start

`ash
git clone https://github.com/cikeyz/park-queue.git
cd park-queue
python -m http.server 8000
`

Open http://127.0.0.1:8000/

## Project Structure

`	ext
park-queue/
├── index.html
├── script.js
├── styles.css
├── LICENSE
├── README.md
└── .gitignore
`

## License

MIT. See [LICENSE](LICENSE).

## Course Note

Built for CMPE 201 (Data Structures and Algorithms), Polytechnic University of
the Philippines, under Engr. Julius S. Cansino. Final project case study.
Published here as a standalone project.
