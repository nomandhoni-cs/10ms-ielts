// This is the highest level Root Layout.
// It should be a simple pass-through component.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Do NOT render <html> or <body> here.
  // Just return the children.
  return children;
}
