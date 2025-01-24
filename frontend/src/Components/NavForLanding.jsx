import { useSelector } from 'react-redux';

const NavForLanding = () => {
  const user = useSelector((state) => state.login); // Accessing the login state
console.log(user)
  return (

    <nav className="flex justify-between items-center px-6 py-4 bg-orange-300 text-white shadow-md">
      <div className="flex items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/33/33917.png"
          alt="Logo"
          className="w-10 h-10 mr-2"
        />
        <span className="text-2xl font-bold">TaalTaraang</span>
      </div>

      <div className="text-lg font-semibold">
        {user.loggedin ? (
          <span>Welcome {user.myname}!</span> // Display the logged-in user's name
        ) : (
          <span>Welcome Guest!</span>
        )}
      </div>

      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 shadow-md">
        <img
          src={user.myprofilepic}
          alt="Profile Pic"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </nav>
  );
};

export default NavForLanding;
