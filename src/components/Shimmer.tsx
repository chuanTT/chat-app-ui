const Shimmer = () => {
  return (
    <div className="absolute inset-0 z-2" style={{ backgroundColor: "#f2f3f3" }}>
      <div
        className="w-full h-full absolute top-0 left-0"
        style={{
          transform: "translateX(0) scaleX(0)",
          transformOrigin: "left center",
          backgroundImage:
            "linear-gradient(to left, rgba(219, 219, 219, 0), #dbdbdb 40%, #dbdbdb 60%, rgba(219, 219, 219, 0))",
          animation: "skelSwoosh 1.1s infinite ease-in"
        }}
      ></div>
    </div>
  )
}

export default Shimmer
