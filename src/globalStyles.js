import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Card = styled(motion.div)`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    padding: 20px;
    width: 80%;
    max-width: 600px;

    @media (max-width: 768px) {
        width: 90%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;