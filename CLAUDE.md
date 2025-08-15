# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple Snake game implementation built as a single-page application using vanilla HTML, CSS, and JavaScript. The game features a snake represented by customizable emojis (defaulting to tacos 🌮) that can be controlled via keyboard arrow keys or on-screen touch buttons.

## Architecture

The entire application is contained in a single `index.html` file with inline CSS and JavaScript:

- **HTML Structure**: Canvas element for the game board, control buttons, score display, and emoji selector
- **CSS Styling**: Neumorphic design with responsive layout and mobile-friendly touch controls
- **JavaScript Game Logic**: Canvas-based rendering using 2D context, game loop with collision detection, and input handling

## Key Components

- **Game Canvas**: 300x300 pixel canvas with 15px grid system (20x20 tiles)
- **Game State**: Snake array, food position, direction vectors (dx, dy), score, and game running flag
- **Input Handling**: Keyboard event listeners for arrow keys and button click handlers for touch controls
- **Game Loop**: Recursive setTimeout-based loop with 200ms intervals
- **Emoji Customization**: Dropdown selector allowing players to choose different snake representations

## Development

This is a client-side only application with no build process required. To run:

1. Open `index.html` directly in a web browser
2. Or serve it with any static web server (e.g., `python -m http.server` or `npx serve`)

## Game Mechanics

- Snake moves on a 20x20 grid
- Food spawns randomly, avoiding snake body positions
- Score increases by 10 points per food eaten
- Game ends on wall collision or self-collision
- Direction changes are prevented if they would cause immediate self-collision