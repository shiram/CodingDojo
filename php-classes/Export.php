<?php
declare(strict_types=1);
/**
 * export class 
 */

//  use ReflectionClass;
//  use ReflectionException;
//  use ReflectionProperty;
//  use RuntimeException;

 class Export {
    
    /**
     * @param mixed $subject subject/object to convert 
     * @return array|mixed 
     * @throws RuntimeException
     */
    public function objectToArray($subject) {
        if(is_object($subject)) {
            try {
                $reflect = new ReflectionClass($subject);
            } catch(ReflectionException $e) {
                throw new RuntimeException($e->getMessage());
            }

            $array = [];
            foreach($reflect->getProperties(ReflectionProperty::IS_PUBLIC) as $prop) {
                $array[$prop->getName()] = $prop->getValue($subject);
            }
        } else {
            return $subject;
        }

        return $array;
    }
 
 }