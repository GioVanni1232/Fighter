function determineWinner({ player, enemy, timeId }) {
  clearTimeout(timeId);
  const end = document.querySelector(".end");
  end.style.display = "block";

  if (player.health > enemy.health) end.innerHTML = "Player 1 Wins";
  else if (player.health < enemy.health) end.innerHTML = "Player 2 Wins";
  else if (player.health === enemy.health) end.innerHTML = "Tie";
}

let time = 31;
let timeId;

function decreaseTime() {
  timeId = setTimeout(decreaseTime, 1000);
  if (time > 0) time--;
  document.querySelector(".time").innerHTML = time;

  if (time === 0) determineWinner({ player, enemy, timeId });
}

function rectangleCollision({ recatngle1, rectangle2 }) {
  return (
    recatngle1.attackBox.position.x + recatngle1.attackBox.width >=
      rectangle2.position.x &&
    recatngle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    recatngle1.attackBox.position.y + recatngle1.attackBox.height >=
      rectangle2.position.y &&
    recatngle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}
