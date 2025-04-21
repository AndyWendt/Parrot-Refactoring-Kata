<?php

namespace Parrot;

use Exception;

interface ParrotInterface
{
    /**
     * @throws Exception
     */
    public function getSpeed(): float;

    /**
     * @throws Exception
     */
    public function getCry(): string;
}