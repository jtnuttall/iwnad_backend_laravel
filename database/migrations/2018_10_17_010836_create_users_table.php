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
			$table->integer('permissions');
			$table->string('password', 60);
			$table->string('profilepic')->nullable();
			$table->string('occupation', 64)->nullable();
			$table->string('organization', 45)->nullable();
			$table->string('phone', 20)->nullable();
		});

		$zeroemail = env('ADMIN_EMAIL', "abarman@usc.edu");
		$zeropass = password_hash(env('ADMIN_PASSWORD', "iwnadCS401"), PASSWORD_BCRYPT);

		DB::table('users')->insert(
			array(
				'email' => $zeroemail,
				'password' => $zeropass,
				'permissions' => 0,
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
