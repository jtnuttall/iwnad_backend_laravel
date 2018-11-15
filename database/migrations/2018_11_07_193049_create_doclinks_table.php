<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDoclinksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('doclinks', function(Blueprint $table)
		{
			$table->integer('doclinkid', true);
			$table->string('name', 45);
			$table->string('link', 256);
			$table->integer('moduleid')->unsigned()->index('fk_doclinks_modules1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('doclinks');
	}

}
