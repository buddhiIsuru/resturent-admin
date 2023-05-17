const Wrapper = ({ children, sidebarOpen }) => {
  return (
    <div
      className={`pl-0 w-full ${
        sidebarOpen ? "lg:pl-[288px]" : "lg:pl-[64px]"
      } duration-500`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
