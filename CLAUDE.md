# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple Snake game implementation built as a single-page application using vanilla HTML, CSS, and JavaScript. The game features a snake represented by customizable emojis (defaulting to tacos 🌮) that can be controlled via keyboard arrow keys or on-screen touch buttons.

## Architecture

The application is structured as separate files for maintainability:

- **index.html**: HTML structure with canvas element for game board, control buttons, score display, and emoji selector
- **style.css**: Neumorphic design with responsive layout and mobile-friendly touch controls
- **script.js**: Canvas-based rendering using 2D context, game loop with collision detection, and input handling

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
- Regular food spawns randomly, avoiding snake body positions
- Regular food worth 10 points per food eaten
- Special food (🍓 strawberry) spawns with 10% chance alongside regular food
- Special food worth 5 points and only one can exist at a time
- Game ends on wall collision or self-collision
- Direction changes are prevented if they would cause immediate self-collision

## Development Workflow

### Planning New Features
When planning new features or major changes:

1. **Ask clarifying questions** to understand requirements fully:
   - Gather specific details about functionality, behavior, and design
   - Confirm technical specifications and constraints
   - Understand user experience expectations

2. **Use TASKS.md for task management**:
   - Create/update TASKS.md file to track all planned tasks
   - Break complex features into smaller, actionable items
   - Update task status as work progresses
   - Mark tasks as complete when fully implemented and tested

3. **Maintain comprehensive documentation**:
   - Update this CLAUDE.md file when architecture or game mechanics change
   - Document new features and their implementation details
   - Keep task lists and project overview current