const ContentWrapper = ({ children }) => {
  return (
    <div
      className={`flex-1 h-full overflow-y-auto bg-[#F1F7FF] py-4 w-full
      [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-track]:bg-[#002366]
      [&::-webkit-scrollbar-thumb]:bg-[#AEBAC9]
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pb-20`}
    >
      {children}
    </div>
  );
};


export default ContentWrapper
