**EU Interactive Map**

## Project Description

An interactive map of European Union countries with the ability to view and compare various statistical data. Users can select individual countries or groups of countries to analyze data on demographics, languages, economy, and other indicators.
Features

Interactive EU map with zoom functionality
Selection of one or multiple countries to view statistics
Toggle between different thematic data (gender, languages, nationalities, etc.)
Comparative analysis of selected countries' indicators
Visualization of statistical data through charts and diagrams

## Technologies

Frontend: Next.js, React
Map: React Simple Maps with d3-zoom integration
Data Visualization: Recharts
Styling: styled components
Data: Local JSON files

Getting Started


# Install dependencies

```
npm install
```

# Run the development server

```
npm run dev
```

Project Structure

```
/src
  /components
    /Map          # Map components
    /Statistics   # Statistics display components
    /UI           # User interface components
  /data           # JSON data files
  /pages          # Next.js pages
  /styles         # Styles
  /utils          # Helper functions
```

## Development Roadmap

Basic implementation of interactive map
Adding country selection functionality
Integration of statistical data
Implementation of comparative analytics
UI/UX improvements
Performance optimization