<?php

/**
 * Simple php stack implementation
 */

 class Stack {

    public $stack;

    public function __construct() {
        $this->stack = []; 
    }

    public function isEmpty() {
        return sizeof($this->stack) == 0 ? true : false;
    }

    public function push($data) {
        array_push($this->stack, $data);
    }

    public function pop() {
        return array_pop($this->stack);
    }

 }