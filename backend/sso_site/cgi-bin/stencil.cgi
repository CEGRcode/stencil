#!/usr/bin/perl

my $USERID=$ENV{"REMOTE_USER"};
my $TOKEN = "76A42ab2";
#print "Location: https://stencil.biohpc.cornell.edu:3000?$TOKEN&$USERID\n\n";


print "Content-Type: text/html\n\n";
my $content = <<"EOF";
<html>
<body>
<form id="myform" name="myform" action="https://stencil.biohpc.cornell.edu:8081/login" method="post">
    <p>
        <input type="hidden" name="username" value="$USERID" />
    </p>
    <p>
        <input type="hidden" name="password" value="$TOKEN" />
    </p>
        <input type="submit" value="Click to start Stencil">
    	<script>
	document.getElementById("myform").submit();
	</script>
</form>
</body>
</html>
EOF


print $content;

