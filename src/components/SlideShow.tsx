import { Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const SlideShow = () => {
    return (
        <Box>
            <Carousel autoPlay interval={2500} infiniteLoop={true}>
                <Box>
                    <img
                        src="https://preview.colorlib.com/theme/capitalshop/assets/img/hero/h1_hero1.jpg.webp"
                        alt=""
                    />
                    <p
                        className="legend"
                        style={{
                            fontSize: '20px',
                        }}
                    >
                        Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus
                        dignissimos facilis neque nulla earum.
                    </p>
                </Box>
                <Box>
                    <img
                        src="https://preview.colorlib.com/theme/capitalshop/assets/img/hero/h1_hero2.jpg.webp"
                        alt=""
                    />
                    <p
                        className="legend"
                        style={{
                            fontSize: '20px',
                        }}
                    >
                        Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus
                        dignissimos facilis neque nulla earum.
                    </p>
                </Box>
                <Box>
                    <img src="https://flone.jamstacktemplates.dev/assets/img/slider/slider-16.jpg" alt="" />
                    <p
                        className="legend"
                        style={{
                            fontSize: '20px',
                        }}
                    >
                        Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus
                        dignissimos facilis neque nulla earum.
                    </p>
                </Box>
            </Carousel>
        </Box>
    );
};

export default SlideShow;
