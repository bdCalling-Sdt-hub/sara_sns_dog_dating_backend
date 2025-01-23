import sentSupportMessage from "./support.controller";

const express = require('express');
const router = express.Router();

// const { sentSupportMessage } = require('./support.controller');

router.post('/', sentSupportMessage);

export const supportRoutes = router;