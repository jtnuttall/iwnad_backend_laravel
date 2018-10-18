<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->integer('userid', true);
			$table->string('email', 64)->unique('email_UNIQUE');
			$table->timestamp('email_verified_at')->nullable();
			$table->integer('permissions');
			$table->string('password', 255);
			$table->string('name', 64)->nullable();
			$table->string('profilepic')->nullable();
			$table->string('occupation', 64)->nullable();
			$table->string('organization', 45)->nullable();
			$table->string('phone', 20)->nullable();
			$table->rememberToken();
			$table->timestamps();
		});

		$zeroemail = env('ADMIN_EMAIL', "abarman@usc.edu");
		$zeropass = Hash::make(env('ADMIN_PASSWORD', "iwnadCS401"));

		DB::table('users')->insert(
			array(
				'email' => $zeroemail,
				'password' => $zeropass,
				'permissions' => 0,
				'name' => "Avni - Admin"
			)
		);
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
