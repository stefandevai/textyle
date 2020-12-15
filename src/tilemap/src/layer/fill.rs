use super::Layer;
use wasm_bindgen::prelude::*;

// Adam Milazzo's Flood Fill algorithm port from C#
// Originally found here: <http://www.adammil.net/blog/v126_A_More_Efficient_Flood_Fill.html>
impl Layer {
    fn can_fill(&self, x: i32, y: i32, value_to_fill: i32) -> bool {
        x >= 0
            && y >= 0
            && x <= self.width() as i32
            && y <= self.height() as i32
            && self.get(x, y) == value_to_fill
    }

    fn local_fill(&mut self, x: i32, y: i32, value: i32, value_to_fill: i32) {
        let mut my = y;
        let mut mx = x;

        loop {
            let ox = mx;
            let oy = my;

            while my != 0 && self.can_fill(mx, my - 1, value_to_fill) {
                my -= 1;
            }
            while mx != 0 && self.can_fill(mx - 1, my, value_to_fill) {
                mx -= 1;
            }
            if mx == ox && my == oy {
                break;
            }
        }
        self.local_fill_core(mx, my, value, value_to_fill);
    }

    fn local_fill_core(&mut self, x: i32, y: i32, value: i32, value_to_fill: i32) {
        let mut last_row_length = 0;
        let mut my = y;
        let mut mx = x;

        loop {
            let mut row_length = 0;
            let mut sx = mx;

            if last_row_length != 0 && !self.can_fill(mx, my, value_to_fill) {
                loop {
                    last_row_length -= 1;
                    if last_row_length <= 0 {
                        return;
                    }

                    mx += 1;
                    if self.can_fill(mx, my, value_to_fill) {
                        break;
                    }
                }
                sx = mx;
            } else {
                while mx != 0 && self.can_fill(mx - 1, my, value_to_fill) {
                    mx -= 1;
                    self.set(mx, my, value);

                    if my > 0 && self.can_fill(mx, my - 1, value_to_fill) {
                        self.local_fill(mx, my - 1, value, value_to_fill);
                    }

                    row_length += 1;
                    last_row_length += 1;
                }
            }

            while sx < self.width() as i32 && self.can_fill(sx, my, value_to_fill) {
                self.set(sx, my, value);

                row_length += 1;
                sx += 1;
            }

            if row_length < last_row_length {
                let end = mx + last_row_length;
                sx += 1;

                while sx < end {
                    if self.can_fill(sx, my, value_to_fill) {
                        self.local_fill_core(sx, my, value, value_to_fill);
                    }

                    sx += 1;
                }
            } else if row_length > last_row_length && my != 0 {
                let mut ux = mx + last_row_length;
                ux += 1;
                while ux < sx {
                    if self.can_fill(ux, my - 1, value_to_fill) {
                        self.local_fill(ux, my - 1, value, value_to_fill);
                    }

                    ux += 1;
                }
            }

            last_row_length = row_length;
            my += 1;
            if last_row_length == 0 && my >= self.height() as i32 {
                break;
            }
        }
    }
}

#[wasm_bindgen]
impl Layer {
    pub fn fill(&mut self, x: i32, y: i32, value: i32) {
        let value_to_fill = self.get(x, y);
        if value_to_fill != value {
            self.local_fill(x, y, value, value_to_fill);
        }
    }
}
