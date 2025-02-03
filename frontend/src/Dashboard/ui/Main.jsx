

const Main = ({children}) => {
    return (
      <div className="text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row transition-all duration-300 dark:bg-gray-800 h-screen">
        {children}
      </div>
    )
  }
  
  export default Main
  