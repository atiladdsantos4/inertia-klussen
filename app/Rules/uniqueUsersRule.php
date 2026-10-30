<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\User;
use App\Models\Empresa;

class uniqueUsersRule implements ValidationRule
{
    private $empresa;
    private $email;

    public function __construct($empresa,$email){
       $this->empresa = $empresa;
       $this->email = $email;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $teste = $value;
        $exist = User::where('empresa',$this->empresa)
        ->where('email',$this->email)
        ->exists(); //
        if($exist) {
            $fail('Email já existente nesta empresa');
        }
    }
}
/*
        public function passes($attribute, $value)
        {
            // Your validation logic here
            $existe = Escopo::where('esc_posicao',$value)->exists();
            return $existe == false;
            //$value == 'escopo_posicao';
        }

        public function message()
        {
            return 'A posição do escopo já foi definida';
        }
*/
