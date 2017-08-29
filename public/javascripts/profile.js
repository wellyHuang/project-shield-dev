$(document).ready(function() {
  // $('#side-menu').hide();

  $('#prof-name').text('');
  $('#prof-dob').text('');
  $('#prof-email').text('');
  $('#prof-gender').text('');
  $('#prof-phone').text('');
  $('#prof-nick').text('');
  setTimeout(loadProf, 1000);

  $(document).on('click', '#prof-edit', profEdit); //打開modal
  $(document).on('click', '#prof-submit', profSubmit); //完成編輯
  $('#profModal').on('hidden.bs.modal', profClear); //viewModal 收起來
  $(document).on('click', '#signout-btn', logout); //登出
});

function loadProf() {
  let userId = auth.currentUser.uid;
  // console.log(userId);
  database.ref('users/' + userId).on('value', snap => {
    let profInfo = snap.val();
    // console.log(profInfo);

    if(profInfo === null) {
      $('#error-message').show();
    } else {
      $('#prof-id').text(userId);
      $('#prof-name').text(profInfo.name);
      $('#prof-dob').text(profInfo.dob);
      $('#prof-email').text(profInfo.email);
      $('#prof-gender').text(profInfo.gender);
      $('#prof-phone').text(profInfo.phone);
      $('#prof-nick').text(profInfo.nickname);
    }
  });
}

function profEdit() {
  let id = $('#prof-id').text();
  let name = $('#prof-name').text();
  let nick = $('#prof-nick').text();
  let dob = $('#prof-dob').text();
  let email = $('#prof-email').text();
  let gender = $('#prof-gender').text();
  let phone = $('#prof-phone').text();

  $('#prof-edit-id').val(id);
  $('#prof-edit-name').val(name);
  $('#prof-edit-dob').val(dob);
  $('#prof-edit-email').val(email);
  $('#prof-edit-gender').val(gender);
  $('#prof-edit-phone').val(phone);
  $('#prof-edit-nick').val(nick);


}

function profSubmit() {
  let userId = auth.currentUser.uid;
  let id = $('#prof-edit-id').val();
  let name = $('#prof-edit-name').val();
  let nick = $('#prof-edit-nick').val();
  let dob = $('#prof-edit-dob').val();
  let email = $('#prof-edit-email').val();
  let gender = $('#prof-edit-gender').val();
  let phone = $('#prof-edit-phone').val();

  database.ref('users/' + userId).remove();
  database.ref('users/' + userId).update({
    name: name,
    dob: dob,
    email: email,
    gender: gender,
    phone: phone,
    nickname: nick
  });

  $('#error-message').hide();
  profClear();
  loadProf();
  $('#profModal').modal('hide');
  location.reload();
}

function profClear() {
  $('#prof-edit-id').val('');
  $('#prof-edit-name').val('');
  $('#prof-edit-dob').val('');
  $('#prof-edit-email').val('');
  $('#prof-edit-gender').val('Male');
  $('#prof-edit-phone').val('');
  $('#prof-edit-nick').val('');
}
