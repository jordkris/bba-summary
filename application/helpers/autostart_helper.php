<?php
/**
 * Set the default timezone to "Asia/Jakarta".
 *
 * @throws Exception If the timezone cannot be set.
 */
function setWIB()
{
	date_default_timezone_set("Asia/Jakarta");
}
setWIB();