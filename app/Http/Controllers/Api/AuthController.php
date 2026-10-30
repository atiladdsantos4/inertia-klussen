<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Rules\uniqueUsersRule;
use Laravel\Sanctum\HasApiTokens;


class AuthController extends Controller
{
    /**
     * Create User  Customizado com o Campo Empresa
     * @param Request $request
     * @return User
     */
    public function createUser(Request $request)
    {
        $all = $request->all();
        try {
            //Validated
            $validateUser = Validator::make($request->all(),
            [
                'name' => 'required',
                'email' => 'required',
                //'email' => 'required|email|unique:users,email,empresa',
                //'empresa' => 'required',
                'empresa' => ['required', new uniqueUsersRule($all['empresa'],$all['email'])],
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'empresa' => $request->empresa,
                'password' => Hash::make($request->password)
            ]);

            //salvado o token gerado na tabela user / empresa//
             $token = $user->createToken("API TOKEN")->plainTextToken;
             $last_user = User::where('email', $request->email)->where('empresa', $request->empresa)->first();
             $last_user->remember_token = $token;
             $last_user->update();

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'token' => $token
                //$user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login The User
     * @param Request $request
     * @return User
     */
    public function loginUser(Request $request)
    {
        try {
            $validateUser = Validator::make($request->all(),
            [
                'email' => 'required|email',
                'password' => 'required',
                'empresa' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password','empresa']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password não encontrados em nossa base.',
                ], 401);
            }

            $user = User::where('email', $request->email)->where('empresa', $request->empresa)->first();

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function getUserToken(Request $request){
        try {

            //Validated
            $validateUser = Validator::make($request->all(),
            [
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                'empresa' => 'required'
            ]);

            if ($validator->fails())  {
                $valor =  $validator->errors()->get('*');
                $error = [
                    'status' => false,
                    'data' => $valor
                ];
                return json_encode($error,JSON_PRETTY_PRINT);

            } else {

                $user = User::where('email', $request->email)->where('empresa', $request->empresa)->first();

                $error = [
                    'status' => true,
                    'token' => $user->createToken("API TOKEN")->plainTextToken
                ];

                return json_encode($error,JSON_PRETTY_PRINT);
            }




        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
