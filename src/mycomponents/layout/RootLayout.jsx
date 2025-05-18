import React from "react";

export default function RootLayout({ children, title = "LAPO - Authorization Queue", description = "LAPO management system" }) {
  React.useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  return (
    <main className=" ">
      {children}
    </main>
  );
}