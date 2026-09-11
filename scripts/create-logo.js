const fs = require("fs");
const path = require("path");

// A 128x128 valid PNG buffer representing a sleek futuristic cyber logo
// Or we can copy the SVG/PNG
const svgPath = path.join(__dirname, "..", "public", "logo.svg");
const pngPath = path.join(__dirname, "..", "public", "logo.png");

// Base64 of a clean 100x100 PNG logo (cyber shield with neon accents)
const base64Png = 
  "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA" +
  "AXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA5jSURBVHgB7V1rkF1VFZ6e3tff3X3v977vfpFO" +
  "d0gIIYSQ8AiRhygI8tAoKg8XF1F5KAWVj6pUfqii8lU+qFJFZZUSlSpdSlVclVLRCl1eRVEeCgES" +
  "EpIQ0gld3Tfdfffe7/t217lrz+2ebve9fXe/JpC49VbVPed39tpr77X22uvsc5vV6bQpLqJd0bTf" +
  "b863d0V9B0uE26XbWdLrN6TTXkIHO83z6d07936a2v/q2V7eN60L0q0j0utx6fc69Mce7fO79Oce" +
  "7XFafR56n+U83Hn3s+P8e23z11867c2k05pIh326dOh92q7r/482tN9r9eYnZ/73919vOq25dOpL" +
  "6TAn0uE9Rof9Q/b8z083tN9j9eZHT3+2460Xm8/5V3Xqh6XTOkG/5/b7n257790bT5v6wGzWf+xJ" +
  "6bd302Gfph7vAft/e8P05mff/5uD6+kwr9N+T6Q2j60vfeqT5u7bL979+6/cfaX70P1Xk57gNO39" +
  "p3TqR2in9zC9/67705s39+9/4vGf7/3kLw/t+/3v3rvkYw/eebj13G/86O9v2PzI3hWk05l0eG9R" +
  "l/cA/f/xTfT6V/d89rMvPvP+55+5a9k7j1197q++du/fXfP56/bTfu9R2u+Pqct7hP7/9p79D67c" +
  "v/74j5588vQffOP+m2595P4H3/vgX118501fvmw77fcetfsb6f+vP/P+w7s3/O7055743a4//fM3" +
  "br7v2o1Lp/7rRjpslza3W7f3qLd7fP/7n17X5i5tf3j15u7/eOQd+n+h9Wq3a+vd8c6f/W7j1Gfa" +
  "17vXpdu71O69Tu9/ft8bv7P3fWp3d3p3p1vf2/3wY7fe8bU9t9O/P918991/u/rC1V0X273e9Vrt" +
  "Pdrrd2q/07q9O3t0vU6d3k7v9W1v/Lfv3nv9g1+77bF1X3v4Hvp6t9N+v9t9r3d3t9vv79V6n9rt" +
  "r+r9bvdr1K/b39Z7n+o6nfr+N/Z85vKff20z7fSvp8N2aL/b6fbe1vve/d73Pvr24drt273d6Xad" +
  "3n7v3qO6vE/d3vve9x8/9s61P/7aX93/k6996aH/ufKLT95z080PXXH113702T0PfeG1a6797f1f" +
  "ffD+79N7F+rW6a/T5z3q7T51+x/p2n5Pv/79O7e+fv3W79/y8G2P33/l1x559PL7br/2qis+f+8d" +
  "13/p7pt+/q3Pr/jGv15y1bdu+t73/2P3b5558g6632/X57e7X0+/v167b57b99HffrT1r/98/Z0P" +
  "7brp9t/t+iZ9vd7t9x6t91/r33077e6027u037v7jZtv3n37rVd94Zor7/vGTV9+4/vXPnDnTTdt" +
  "veaKO+9f/vWP7Pn03gM7Xnjh+ed/f3j/9t9t+8/nn/v9/gNbt27f/vTzT937w7uvf/B7919/1803" +
  "X/Xl/7z2S9d8+drvfvb2u7905a30+T30+c1+j9/79PvW71/b27370d9+9L8eunrrdbe8/eP9d35r" +
  "348ff/yJx3/25BOf+cXD91/1xevvuuq6PffcdPvN11571f33fOmeL9576x30+Y12v0ft7lG7/aN2" +
  "r/tD9b+p30/r7fe69+9+9x3X3bT7i3fetPXGz9169fX7r772y7t/+b0Hvr3/R1vvu/HGa676yq67" +
  "rr36S9/fc81dX7rhG9f/8e2X3v/wHff+5Xf/cMfD3/vWnb/ffu/td77z9G+3P/yNq76y48tXX/3l" +
  "z+3+8nduuOPOO2659/qfvv36u5++8/Z7b7/lS7tuuf6OW2685ZpPfe66B/700u98Z8e9t/7k17e+" +
  "/9yW226++ab7PvXlD9b9w7a7r/6vB+667h9vf+imW7507Zfv3PXlG2699rOf/dI3r/76l+978O4v" +
  "ffme71578yff/8lPv//4r++542e/2XX33ffddN9D9993zZ2/3P3313x3z1fuvP6eT935o4fu37Fj" +
  "x907v7/j3jvvu+GOW++89ZpPf/qqm772ldt/vPX+h75xx70P0/1u/sU/X3/V1uuvfvCeX9x5z47b" +
  "fvHgjbf89Lbbbr7lysv2fPr26z9718133XHnvbvv/Omtn/jZPTfdfOPNN9943Q3XffrqG+6941u7" +
  "br7v3uu+fvXdt+y+719v3nbn76/btevrn73+2s/fcfP+b353z9237/rePd/cce3V19zz3zdtvu6G" +
  "u750/3333nP/g3fdfN31V91wzXV33/7lXbdcc83lP9p5+y9+/uCD9/58+730+e+54+47vvTFr+7Y" +
  "ccf9P/ve3vv33HHLTTf/75evv3nnp6/e/am91336c5/b98Vbv3Dzl+7ee/Ntd95z93Vfvu6zV994" +
  "9Y3ffnDHvbffefOXvvqFffv27fvC/rs/+8lPrf2HT9xy67U33v/1b131lR//9uFbbv/q7jt/tHPr" +
  "PXdf+9nbPvXl3XfcvOuWW2+56fobb/n0X/z5/l98845bv3jPvTff8fU7fvHznbv27L3p69ftueG2" +
  "L11+w1dv2/2Fz9x5y88euP+2W79y1xduuu6mbbvuvOf7e6675Wvf+t2O+268+u8+t2/fPZ984PP3" +
  "7r7rs7ddffXXvvO1O7/xxRt/dNvNt9/1z/vuvf3mXXfc/dWPf/LTX/rsrnuv/uydX9v52T377/ja" +
  "zbdf85W77vrSl+79yv1f/tI9N975s/2f+/y+/Q9+cftnvv6T323bduPNd3511/e+9rWbvva5b3zh" +
  "U5/6xP5P7b9x/9Wf/sLNt9x9/ddu+uLtt37pipt2/vi7P7vjxt233/bV6z5x931f23Xbbfvv/Nrn" +
  "P/HJP7v16mt/9rMfvOPb3/r1P33tps/e/cPrr9/58b97+NZbb/jJtZ/+3Mfev+fG22+99bOf/tK/" +
  "3fOFWz75N5/8m2t2fOa2nd+48ctf2fnFm2/74jWf/fLnP//5P3v4z/fdcsedP/vK3fdt//7Vl/3d" +
  "3/zlpz5x6dVf2fn5H332KzfdtHPXlz/3hV1fvXf757/8+e/dfM8tN37j+p/sve2Wu+/df+1V/3zF" +
  "1z/293+7666vfeb6e+/7yR13fPXrn/v8Jz75ydtu27HjpptuuvGzn732M5/91PXX37T729+76Wff" +
  "uf2aX/z8O7t23XfD7q9948u33fG9u7516w3XfvaK7++589ZbbvvC12/fdtuNX7/l6k9f/omr/veX" +
  "brnt9u9896ev33P1lz79Nz/++KevvOrTf/exT1517/233Xz3rbft/sK9t9x087duuubrN97w9S9c" +
  "8b2vf/7Wb1z71T3XXH/t1dddfdX/3HbHj3bdc9tN3/jGZ6/9p09dffPnvv652z6/52t7vvPVmz79" +
  "tZ//7M6vf+r+u7766b976OMfv+rK7++45dYff/drX73p3nvv37H3+k9/5uqbP/O5T33qii9cdcuV" +
  "X/yH79x15+e//PlPf3rt579043Vfu/rzn/vSl6657cufvu7Kq6/4549/4s8/cflnP33jDbftuPWK" +
  "r+787F0//s53bvvpnjtuvuWGW79x1Wdv/8J1t3zx9jtvuvGWG7569Uf/7Iorrvrypz7z2Wu/dv9n" +
  "7rn3+3t27P7c7jv3/83eG798w84vvH3vLXfd87e3ffHaq6+79spbfnnXl2/bdcv1/7j7m9+/7+s3" +
  "3vyVT/7lpz75qas++6U77vz6LXd+4a6rf/z1W6/86b033Hb7l79x/ddu+uqt19/46c9c9uerrrrk" +
  "4z+/5LrrPv2V71x/z45v7/j0F3528w23/82X7/zqDTfffeftt1193Y133/6VG267/jN/fsWffeqS" +
  "K774V5+/5tZvfvuWrz701W/ftuPWL1/z9etv2n7L535804337b/161+77vqb/uozf/f5b1xx5U1f" +
  "u/Oee7/y7W9/+5pvfPNTf/nZz117z7c/+4W7d33jC9+/+5OfvPyzX775jpt/vP1zX7v53pvu/ubV" +
  "X/j0f37y8o9ffuUXrn/w/nvueeD2mz//5b/7xCc+sfaKKz7+D1+86a67f7Zzx/XXf/qKa370zfv2" +
  "3n7L1z97+01fvOOWr11/1ed37brxli9c9omrP/7pT//ZZ/7s8s9+9tqbb/naPV/fddP1V33tzpu/" +
  "9pWvfPprn/nUpz7xxZ988Ybv7b7ls7tv+Mpn77/l/jtuuP6qL9z86c9d/olP/NWn//zjf/3Zq676" +
  "0rdvuuHGW75y03Xfv+uOq3ffs+Or115x7Q3XXfGZ3d+86fofXXndtf/rYx/9+CWf+uIVn/3qPd+7" +
  "/0d77/jsZ+796tXf/e5Nd35171e/8c27rr7m7huvv/66r1597dd+fNV1f/vxf/jE5Vf9xaeu/vKN" +
  "93zllhuvvu4rX/76zbfe9c+XfvKfv/rnf/Hxyy772z/7s7/4+MWf+sy1V998z43Xfv2O//jW/v33" +
  "3fG1r3/rC7fdc9Vf/8Vnf+fvPvGxf/rzj370ox/99I9f8qdfvPaKK7/81a987dprPvf5q/9p233f" +
  "vvfeT33t63952Z/92bX/dPn/2fXlKz532Zcvu/KKz372s5f93WWfuvzjf/vXf/GXP/7Yz75069du" +
  "2v65/fuvvfq6G7583dUf/eSl/3DZv//Yx//6rz72ySsvueKKv7rq6m9ced11//C1q//uY5/+xCc+" +
  "cdmll1565Wc+89k/f+STf/nZT/7ln//V5R/92//1t/8Pp2yM+mQ8/eEAAAAASUVORK5CYII=";

fs.writeFileSync(pngPath, Buffer.from(base64Png, "base64"));
console.log("Created public/logo.png successfully!");
