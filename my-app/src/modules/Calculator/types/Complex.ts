class Complex {
    
    re: number;
    im: number;

    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }

    toString(): string {
        return this.im ?
            this.im > 0 ?
                `${this.re}+i*${this.im}` :
                `${this.re}-i*${-this.im}` :
            this.re.toString();
    }
};

export default Complex;