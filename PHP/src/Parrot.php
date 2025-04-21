<?php

declare(strict_types=1);

namespace Parrot;

use Exception;

class Parrot implements ParrotInterface
{
    private $instance;

    private static function instance(int $type, int $numberOfCoconuts, float $voltage, bool $isNailed)
    {
        return match ($type) {
            ParrotTypeEnum::EUROPEAN => new EuropeanParrot(),
            ParrotTypeEnum::AFRICAN => new AfricanParrot($numberOfCoconuts),
            ParrotTypeEnum::NORWEGIAN_BLUE => new NorwegianBlueParrot($voltage, $isNailed),
            default => new NullParrot()
        };
    }
    
    public function __construct(
        /**
         * @var int ParrotTypeEnum
         */
        private int $type,
        private int $numberOfCoconuts,
        private float $voltage,
        private bool $isNailed
    ) {
        $this->instance = self::instance($type, $this->numberOfCoconuts, $this->voltage, $this->isNailed);
    }

    /**
     * @throws Exception
     */
    public function getSpeed(): float
    {
        return match ($this->type) {
            ParrotTypeEnum::EUROPEAN => $this->instance->getSpeed(),
            ParrotTypeEnum::AFRICAN => $this->instance->getSpeed(),
            ParrotTypeEnum::NORWEGIAN_BLUE => $this->instance->getSpeed(),
            default => $this->instance->getSpeed(),
        };
    }

    /**
     * @throws Exception
     */
    public function getCry(): string
    {
        return match ($this->type) {
            ParrotTypeEnum::EUROPEAN => $this->instance->getCry(),
            ParrotTypeEnum::AFRICAN => $this->instance->getCry(),
            ParrotTypeEnum::NORWEGIAN_BLUE => $this->instance->getCry(),
            default => $this->instance->getCry(),
        };
    }
}

class NullParrot implements ParrotInterface
{

    public function getSpeed(): float
    {
        throw new Exception('Should be unreachable');
    }

    public function getCry(): string
    {
        return throw new Exception('Should be unreachable');
    }
}

class NorwegianBlueParrot implements ParrotInterface
{
    public function __construct(private float $voltage, private bool $isNailed)
    {

    }

    public function getSpeed(): float
    {
        return $this->isNailed ? 0 : $this->getBaseSpeedWith($this->voltage);
    }

    public function getCry(): string
    {
        return $this->voltage > 0 ? 'Bzzzzzz' : '...';
    }

    private function getBaseSpeedWith(float $voltage): float
    {
        return min(24.0, $voltage * $this->getBaseSpeed());
    }

    private function getBaseSpeed(): float
    {
        return 12.0;
    }
}

class AfricanParrot implements ParrotInterface
{
    public function __construct(private int $numberOfCoconuts)
    {}

    public function getSpeed(): float
    {
        return max(0, $this->getBaseSpeed() - $this->getLoadFactor() * $this->numberOfCoconuts);
    }

    public function getCry(): string
    {
        return 'Sqaark!';
    }

    private function getLoadFactor(): float
    {
        return 9.0;
    }

    private function getBaseSpeed(): float
    {
        return 12.0;
    }
}

class EuropeanParrot implements ParrotInterface
{
    public function getCry(): string
    {
        return 'Sqoork!';
    }

    public function getSpeed(): float
    {
        return $this->getBaseSpeed();
    }

    private function getBaseSpeed(): float
    {
        return 12.0;
    }
}

