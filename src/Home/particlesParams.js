export const particlesParams = {
  "particles": {
    "number": {
      "value": 5,
      "density": {
        "enable": true,
        "value_area": 50
      }
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "speed": 0.5,
      "out_mode": "out"
    },
    "shape": {
      "type": [
        "images",
        "circle"
      ],
      "images": [
        {
          "src": "/assets/monkeys/bigleaf.svg",
          "height": 50,
          "width": 50
        },
        {
          "src": "/assets/monkeys/flatleaf.svg",
          "height": 50,
          "width": 50
        },
        {
          "src": "/assets/monkeys/thinleaf.svg",
          "height": 50,
          "width": 50
        }
      ]
    },
    "color": {
      "value": "#DDD"
    },
    "size": {
      "value": 40,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 30,
        "sync": false
      }
    }
  },
  "retina_detect": false
}