async function analyze() {
  const input = document.getElementById("inputText").value;
  const output = document.getElementById("result");

  output.innerHTML = "🔍 Analyzing...";

  const threshold = 0.9;
  const model = await toxicity.load(threshold);
  const predictions = await model.classify([input]);

  const toxicLabels = predictions
    .filter(p => p.results[0].match)
    .map(p => p.label);

  if (toxicLabels.length === 0) {
    output.innerHTML = "✅ Positive or neutral sentiment!";
  } else {
    output.innerHTML = `⚠️ Detected negativity: ${toxicLabels.join(", ")}`;
  }
}