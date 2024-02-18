self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Notification Recieved");
  self.registration.showNotification(data.title, {
    body: "Notification send from Cosmofeed",
    icon: "https://i.postimg.cc/GpLtTqzk/download.jpg",
  });
});
