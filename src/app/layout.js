import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
    <link rel="icon" href="/map.svg" type="image/svg+xml" />
    </head>
    <body>
        <main>
          {children}
        </main>
    </body>
  </html>
)
}
