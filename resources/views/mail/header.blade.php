
<table
  role="presentation"
  width="600"
  cellspacing="0"
  cellpadding="0"
  border="0"
  style="width:100%;
    max-width:600px;
    background-color:#ffffff;
    border-collapse:separate;
    border-spacing:0;
    border-radius:8px;
    overflow:hidden;"
>
  <tr>
    <td align="center" style="padding:0 12px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-collapse:collapse;">

        <!-- Header -->
        <tr>
          <td align="center" style="background-color:#000000;padding:20px 24px;border-bottom:5px solid #FF5F1F;">
            @if($tipo == 'P')
              <img style="width:270px;height:60px;border-radius:50px;display:block;margin:0 auto;border:0;" src="{{asset('assets/img/logo.png')}}" alt="Santos Klussenbedrijf" />
            @else
              <img style="width:270px;height:60px;border-radius:50px;display:block;margin:0 auto;border:0;" src="cid:logo_image" alt="Santos Klussenbedrijf" />
            @endif
            <div style="font-size:11px;line-height:1.5;color:#cccccc;padding-top:8px;letter-spacing:1px;text-align:center;">
              ONDERHOUD · REPARATIE · VERBOUWING
            </div>
          </td>
        </tr>
