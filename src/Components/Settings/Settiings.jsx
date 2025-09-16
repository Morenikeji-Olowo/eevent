import React from 'react'

const Settiings = () => {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const fetchFriends = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/settings/settings.php",
        {
          credentials: "include",
          method:'POST',
          headers: 'conte'
        }
      );
      const data = await res.json();
      if (data.success) {

      }
    } catch (err) {
      console.log("Error fetching friends:", err);
    }
  };
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSave = () => {
    axios
      .post("http://localhost/myapi/settings.php", {
        id: userId,
        name: settings.name,
        email: settings.email,
        password: settings.password, // empty means no password change
      })
      .then((res) => {
        if (res.data.success) {
          alert("Settings updated!");
          setSettings({ ...settings, password: "" }); // clear password field
        } else {
          alert("Error: " + res.data.error);
        }
      });
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Account Settings</h2>

      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={settings.name}
          onChange={handleChange}
          className="ml-2 border rounded p-1 w-full"
        />
      </label>

      <label className="block mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={settings.email}
          onChange={handleChange}
          className="ml-2 border rounded p-1 w-full"
        />
      </label>

      <label className="block mb-4">
        New Password:
        <input
          type="password"
          name="password"
          value={settings.password}
          onChange={handleChange}
          className="ml-2 border rounded p-1 w-full"
          placeholder="Leave blank to keep current password"
        />
      </label>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settiings