const EventEmitter = require("events");

const emitter = new EventEmitter();
const input = process.argv[2];
const inputSplit = input.split("-");

const hourInput = inputSplit[0];
const dayInput = inputSplit[1];
const monthInput = inputSplit[2];
const yearInput = inputSplit[3];

const countDown = new Date(
  yearInput,
  monthInput - 1,
  dayInput,
  hourInput,
  0,
  0
).getTime();

const interval = () => {
  if (
    isFinite(hourInput) &&
    isFinite(monthInput) &&
    isFinite(dayInput) &&
    isFinite(yearInput)
  ) {
    intervalId = setInterval(() => {
      const today = new Date().getTime();

      let distance = countDown - today;

      if (distance < 0) {
        console.log("Время указано неверно");
        return clearInterval(intervalId);
      }
      if (distance === 0) {
        console.log("таймер завершен");
        return clearInterval(intervalId);
      }
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      console.log(
        `осталось Дней:${days} Часов:${hours} Минут:${minutes} Cекунд:${seconds}`
      );
    }, 1000);
  } else {
    console.log("Формат не верный");
  }
};

emitter.on("timer", () => interval());

emitter.emit("timer");
