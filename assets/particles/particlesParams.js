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
          "src": "assets/particles/img/flatleaf.svg",
          "height": 50,
          "width": 50
        },
        {
          "src": "assets/particles/img/bigleaf.svg",
          "height": 50,
          "width": 50
        },
        {
          "src": "assets/particles/img/thinleaf.svg",
          "height": 50,
          "width": 50
        }
      ]
    },
    "color": {
      "value": "#013b1c"
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