const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container px-4 mx-auto">
        <div className="text-center">
          <p className=" text-black font-display text-2xl font-bold mb-2">Christopher Chege</p>
          <p className="text-black text-sm">
            © {new Date().getFullYear()} All rights reserved. Built with passion and React.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

