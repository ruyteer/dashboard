async function getNewsletter() {
  const response = await fetch("https://api.haxtera.com/newsletter");
  const newsletter = await response.json();
  return newsletter.text;
}

async function updateNewsletter(text) {
  await fetch("https://api.haxtera.com/newsletter/update", {
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
}

export { updateNewsletter, getNewsletter };
